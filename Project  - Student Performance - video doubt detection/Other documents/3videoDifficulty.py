##Contant declaration
timeFrameSize = 4;
#userList=['ricky']
#userList=['AnitaB']

def printstatus(event):
	print str(event)
	print str(oldOVT)+"  "+str(oVT)+"  "+str(cVT)+"  "+str(timeWatched)

def update_all_buckets(begin_time, end_time):#accesses the timeFrameBucket to update the frequency count
	#timeFrameBuckets is used in here from global context
	"""	for x in range( int(begin_time/timeFrameSize), int(end_time/timeFrameSize)):
		timeFrameBuckets[x][0]+=1
	
	if (int(begin_time/timeFrameSize)) == (int(end_time/timeFrameSize)):
		timeFrameBuckets[int(begin_time/timeFrameSize)][1]= end_time - begin_time
		return;
	
	timeFrameBuckets[int(begin_time/timeFrameSize)][1] += math.ceil(begin_time/timeFrameSize)*timeFrameSize-begin_time
	timeFrameBuckets[int(end_time/timeFrameSize)][1]   += end_time-math.floor(end_time/timeFrameSize)*timeFrameSize
	
	for x in range( int(math.ceil(begin_time/timeFrameSize)), int(math.floor(end_time/timeFrameSize)) ):
		timeFrameBuckets[x][1]+=timeFrameSize
	"""	
	nearest_beg = (begin_time/timeFrameSize)
	nearest_end = (end_time/timeFrameSize)
	
	if (int(nearest_beg)) == int(nearest_end):
		timeFrameBuckets[int(nearest_beg)][1]= end_time - begin_time#Do not count a frame if it starts and stops in the same frame in an event.
	#	timeFrameBuckets[nearest_beg][0]+=1
		return;
	
	#Otherwise, calculate the difference between the begin and end point from the nearest time frame boundary
	beg_diff = (math.ceil(nearest_beg)*timeFrameSize) - begin_time
	end_diff = end_time - (math.floor(nearest_end)*timeFrameSize)
	
	timeFrameBuckets[int(nearest_beg)][1] += math.ceil(nearest_beg)*timeFrameSize-begin_time
	timeFrameBuckets[int(nearest_end)][1] += end_time-math.floor(nearest_end)*timeFrameSize
	print str(nearest_end)
	
	if beg_diff/timeFrameSize > 0.5:#starting point to nearest frame boundary covers more than 50% of the frame, count it as watched once.
		timeFrameBuckets[int(nearest_beg)][0] += 1
	if end_diff/timeFrameSize > 0.5:#end point to nearest frame boundary covers more than 50% of the frame, count it as watched once.
		timeFrameBuckets[int(nearest_end)][0] += 1
	
	#Add for all the time frames
	for x in range( int(math.ceil(nearest_beg)), int(math.floor(nearest_end)) ):
		timeFrameBuckets[x][0]+=1
		timeFrameBuckets[x][1]+=timeFrameSize

##end of function definition
#####################################################################################################################################



import mysql.connector
import itertools as it
import math

#Setting up the connection to the IITBxDataAnalytics table
cnx = mysql.connector.connect(user='root', password='', host='127.0.0.1', database='IITBxDataAnalytics')
cursor = cnx.cursor()





#Getting the video duration for an individual video in a single course
query = ("select videolength from CourseVideos where courseName=%s and videoSysName=%s")
data = ('CS101.1x', '67a8559582864d6a8148e2ef5c997e8f')
cursor.execute(query, data)
duration = cursor.fetchone()[0]
print "Time to play: "+str(duration)



timeFrameBuckets = [ [0,0.0] for x in range(0, int(math.ceil(duration/timeFrameSize)+1) ) ]
print "Number of timeFrameBuckets for this video:"+str(len(timeFrameBuckets))




### Now, getting the list of all the users from the UserSessionOldLog table for the video.
query = ("select userName, count(eventName) watched from UserSessionOldLog where courseName=%s and moduleSysName=%s and eventType=%s group by userName order by watched desc limit 50")
data = ('CS101.1x', '67a8559582864d6a8148e2ef5c997e8f', 'video')
cursor.execute(query, data)

userList=cursor.fetchmany(size=50)
	
#userList=list()
#for user in cursor:
#	userList.append(user)




timeWatched=0.0
flagPlayPause='paused' #True means playing, False means pause_video event encountered
oVT=0.0;#Stores Old video time
cVT=0.0;#Stores Current video time - useful for calculating the time spent on a a video and the regions visited during a watch
oldOVT=0.0#Stores the old video time before the event changed.

video='67a8559582864d6a8148e2ef5c997e8f'
flag=False



for user in userList:
	#Now, getting the cleaned entries from the MySQL table for a single user (as lots of redundant repetitive entries are there).
	query = ( "select eventType, eventName, moduleSysName, oldVideoTime, currVideoTime, createDateTime from UserSessionOldLog where userName=%s and ((eventType in (%s) and moduleSysName=%s) or (eventType in (%s, %s) and eventName in (%s, %s)) ) order by createDateTime;" )
	data  = ( str(user[0]), 'video', video, 'video', 'navigation', 'save_user_state', 'page_close' )
	cursor.execute(query, data)
	activity = list()

	for element in cursor:#because there unknown number of such elements - a method exists to find the number, the behaviour for it would have to be explored
		activity.append(element)

	
	activityClean=list()
	flag=False
	
	
	
	
	for ind in range(0,len(activity)):
	#	print str(activity[ind][1])+"  "+str(activity[ind-1][1])
		if activity[ind][2]==video and ( activity[ind][1]=='show_transcript' or activity[ind][1]=='load_video' ):
			flag=True#switched on flag
			#print "testing:   "+str(activity[ind])
			activityClean.append(activity[ind])
		
		elif flag and activity[ind][1]=='page_close':#To be removed later, when the video id is available with the save_user_state event.
			
			#Append the current event being examined to the end of the list
			i = ind;
			activityClean.append(activity[i])
			
			#If the save_user_event for this page close has not already been covered (immediately before, in case of no playing)
#XXX		if not activity[i-1][1]=='save_user_state':
			while not (activity[i][1]=='save_user_state' or i == len(activity)):
				i+=1
			#error checking: do not check beyond scope of list index... If so, then leave searching for save_user_state..
			#maybe it has been covered, or it was never obtained in the logs.
			if not (i == len(activity)):
				activityClean.append(activity[i])
			
			#Set flag off for this video
			flag=False#switched off flag
		
		elif flag and not ( (activity[ind][0],activity[ind][1],activity[ind][3],activity[ind][4]) == (activity[ind+1][0],activity[ind+1][1],activity[ind+1][3],activity[ind+1][4]) ):
		#the event names are the same, and so are the oldVideoTime and newVideoTime
			activityClean.append(activity[ind])

#	for event in activityClean:
#		print event
		
	#iterating over the log of a single user in terms of viewing his/her video activity
	timeWatched=0.0
	flagPlayPause='paused' #True means playing, False means pause_video event encountered
	oVT=0.0;#Stores Old video time
	cVT=0.0;#Stores Current video time - useful for calculating the time spent on a a video and the regions visited during a watch
	oldOVT=0.0#Stores the old video time before the event changed.

	"""
	Remark: event fields
	0	:	eventType
	1	:	eventName
	2	:	moduleSysName
	3	:	oldVideoTime
	4	:	currentVideoTime
	5	:	createDateTime
	"""
	
	
	for e in range(0,len(activityClean)):
		event=activityClean[e]
		
		if event[1]==u'load_video':#Events are already cleaned up, so these all belong to video type events
			oVT=0.0
			cVT=0.0
			flagPlayPaused='paused'
		
		
		
		
		
		
		elif event[1]==u'play_video':
			if flagPlayPaused=='paused':
				#Just started playing from this point
				flagPlayPaused=='playing'
				oVT=event[4]
			
			if cVT > event[4]:
				#calculate difference upto that point
				timeWatched+=cVT-oVT
				update_all_buckets(oVT, cVT)
				oVT=event[4]
			
			cVT=event[4]
			#At any point, cVT stores the amount of time watched upto that point, and oVT stores the last point of start.
		
		
		
		
		
		elif event[1]==u'pause_video':
		#	if flagPlayPaused='playing':
		#		flagPlayPaused='paused'
				
			if cVT > event[4]:
				#calculate difference upto that point
				timeWatched+=cVT-oVT
				update_all_buckets(oVT, cVT)
				oVT = event[4]
				cVT = event[4]
			else:#in case of successive pause events, it may be that video as been opened in different tabs. So, we need to cover all the regions watched.
				cVT=event[4]
				#calculate difference upto that point
				timeWatched+=cVT-oVT
				update_all_buckets(oVT, cVT)
				oVT = event[4]
			
		
		
		
		
		
		
		
		
		elif event[1]==u'seek_video':
			#If the video is playing when seeking occurs
			if flagPlayPause=='playing':
				flagPlayPause='paused'
				if event[3] > cVT:
					#calculate difference
					timeWatched+=cVT-oVT
					cVT=event[3]
					update_all_buckets(oVT, cVT)
				oVT=event[4]
				
			else: #flagPlayPause=='paused', only slider is moved.. so change only the start time to the current end point.
				oVT=event[4]
		
		
		
		
		elif event[1]==u'stop_video':
			flagPlayPaused='paused'
			#calculate difference upto that point
			timeWatched+=cVT-oVT
			cVT = event[4]
			update_all_buckets(oVT, cVT)
		
		
		
		
		
		
		
		elif event[1]==u'page_close':#Events are already cleaned up, so these all belong to navigation type events
			save_user_event=activityClean[e+1]
			
			if save_user_event[3]==0.0 and save_user_event[4]==0.0:
				continue;
			
			cVT = save_user_event[4]
			#calculate difference upto that point
			timeWatched+=cVT-oVT
			cVT = save_user_event[4]
			update_all_buckets(oVT, cVT)
				
		
		
		
		
		
		
		
#		printstatus(event)
	#	print timeFrameBuckets
	print "Total time spent by "+user[0]+" on this video: "+str(timeWatched)

### End of processing


###Showing summary for a single video	
for timeFrame in range(len(timeFrameBuckets)):
	print "Time Frame "+str(timeFrame*timeFrameSize)+" to "+str((timeFrame+1)*timeFrameSize-1)+"\t:: count:  "+str(timeFrameBuckets[timeFrame][0])+"\t  time spent:  "+str(timeFrameBuckets[timeFrame][1])

