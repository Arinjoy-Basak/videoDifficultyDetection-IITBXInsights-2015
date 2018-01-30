##Contant declaration
timeFrameSize = 4;
userList=['LizaDas']


def printstatus(event):
	print str(event),
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
	
	timeFrameBuckets[int(begin_time/timeFrameSize)][1] += math.ceil(nearest_beg)*timeFrameSize-begin_time
	timeFrameBuckets[int(end_time/timeFrameSize)][1]   += end_time-math.floor(nearest_end)*timeFrameSize
	
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


####   ASK TODO		To store the individual student names and oVT and cVT as well in buckets, or not?
timeFrameBuckets = [ [0,0.0] for x in range(0, int(math.ceil(duration/timeFrameSize)) ) ]
print "Number of timeFrameBuckets for this video:"+str(len(timeFrameBuckets))



timeWatched=0.0
flagPlayPause='paused' #True means playing, False means pause_video event encountered
oVT=0.0;#Stores Old video time
cVT=0.0;#Stores Current video time - useful for calculating the time spent on a a video and the regions visited during a watch
oldOVT=0.0#Stores the old video time before the event changed.






for user in userList:
	#Now, getting the cleaned entries from the MySQL table for a single user (as lots of redundant repetitive entries are there).
	query = ( "select distinct eventName, oldVideoTime, currVideoTime, createDateTime from UserSessionOldLog where eventType = %s and courseName = %s and userName = %s and moduleSysName =%s group by createDateTime, eventName order by createDateTime" )
	data  = ( 'video', 'CS101.1x', str(user), '67a8559582864d6a8148e2ef5c997e8f' )
	cursor.execute(query, data)
	activity = list()

	for element in cursor:
		activity.append(element)

	#for element in it.izip(activity, activity[1:]):
	#	print str(element)

	activityClean=list()
	for ind in range(1,len(activity)):
	#	print str(activity[ind][1])+"  "+str(activity[ind-1][1])
		if not (( activity[ind][0]==activity[ind-1][0] ) and ( activity[ind][1]==activity[ind-1][1] ) and ( activity[ind][2]==activity[ind-1][2] )):
		#the event names are the same, and so are the oldVideoTime and newVideoTime
			activityClean.append(activity[ind-1])

	#TODO: Note: to later merge these two in order to get a more efficient code over iterators; either using it.izip() or some other technique, and avoiding having to create a different list.

	#for i in activityClean:
	#	print i

	#iterating over the log of a single user in terms of viewing his/her video activity
	timeWatched=0.0
	flagPlayPause='paused' #True means playing, False means pause_video event encountered
	oVT=0.0;#Stores Old video time
	cVT=0.0;#Stores Current video time - useful for calculating the time spent on a a video and the regions visited during a watch
	oldOVT=0.0#Stores the old video time before the event changed.

	"""
	Remark: event fields
	0	:	eventName
	1	:	oldVideoTime
	2	:	currentVideoTime
	3	:	createDateTime
	"""
	for event in activityClean:

		if event[0]==u'load_video':
			if flagPlayPause=='playing':
				timeWatched+=(oVT-oldOVT)
				update_all_buckets(oldOVT, oVT)
#				flagPlayPause='paused'#after loading, the video watching will start from a certain position, which will be captured.
			else:
				flagPlayPause='paused'
				oldOVT,oVT,cVT=0.0,0.0,0.0
	
		elif event[0]==u'play_video':
			if flagPlayPause=='paused':
				flagPlayPause='playing'
				oldOVT=oVT
				oVT=event[2]#which is the currentVT
	
		elif event[0]==u'pause_video':
			if flagPlayPause=='playing':
				flagPlayPause='paused'
				cVT=event[2]
				timeWatched+=(cVT-oVT)
				update_all_buckets(oVT, cVT)
	
		elif event[0]==u'seek_video':
			if flagPlayPause=='playing':
				timeWatched+=(event[1]-oldOVT)
				update_all_buckets(oldOVT, event[1])
				oldOVT=event[1]
				oVT=event[2]
				flagPlayPause='paused'
			elif flagPlayPause=='paused':
				oldOVT=event[1]
				oVT=event[2]
	
		printstatus(event)
	#	print timeFrameBuckets
	print "Total time spent by "+user+" on this video: "+str(timeWatched)

### End of processing


###Showing summary for a single video	
for timeFrame in range(len(timeFrameBuckets)):
	print "Time Frame "+str(timeFrame*timeFrameSize)+" to "+str((timeFrame+1)*timeFrameSize-1)+"\t:: count:  "+str(timeFrameBuckets[timeFrame][0])+"\t  time spent:  "+str(timeFrameBuckets[timeFrame][1])

