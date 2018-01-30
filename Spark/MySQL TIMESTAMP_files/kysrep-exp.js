function KysReporter(fr,crId,minIntr,pr,maxCycles,pixInfo,doLog,failOptions)
{
	this.enabled = true;
    this.fr = fr;
    this.crId = crId;
    this.doLog = doLog;
	this.intrUnit = 5;
    this.minIntr = minIntr*this.intrUnit;
	this.pr = pr;
	this.cycle = 0;
	this.maxCycles = (!maxCycles || maxCycles <= 0) ? 1000000 : maxCycles;
    this.pixInfo = pixInfo;
	this.failOptions = failOptions || [];
	this.curI = -1;
	this.applySrc();

    this.log("Init: crId=" + crId + ", minIntr=" + this.minIntr + ", pr=" + this.pr);
    this.listen();
    this.startCycle();
}
KysReporter.prototype.log = function(str)
{
    if (this.doLog)
        console.log(">>> KysRep: " + str);
}
KysReporter.prototype.applySrc = function()
{
	if (this.failOptions.length == 0)
		return;
	else if (this.failOptions.length == 1)
	{
		this.fr.src = this.failOptions[0];
		return;
	}
	
	var newI;
	do
	{
		newI = Math.floor(Math.random()*this.failOptions.length);
	} while (newI == this.curI);
	this.curI = newI;
	this.fr.src = this.failOptions[this.curI];
}
KysReporter.prototype.listen = function()
{
    var me = this;
    this.fr.addEventListener('mouseover', function() { me.onMouseOver(); });
    this.fr.addEventListener('mouseout' , function() { me.onMouseOut (); });
    this.log("Listening to mouse events");
}
KysReporter.prototype.startCycle = function()
{
	++this.cycle;
	if (this.cycle >= this.maxCycles)
		return;
	
	this.overEv = this.outEv = 0;
	var intr = this.cycleIntr();
	if (this.enabled)
	{
		var me = this;
		setTimeout(function() { me.onCycleEnd() }, intr);
	}
    this.log("Cycle Started (" + this.cycle + ", " + intr + ")");
}
KysReporter.prototype.cycleIntr = function()
{
	for (var intr = this.minIntr; Math.random() > this.pr; intr += this.intrUnit)
	{}
	return intr*1000;
}
KysReporter.prototype.onMouseOver = function()
{
    ++this.overEv;
    this.log("MouseOver " + this.overEv);
}
KysReporter.prototype.onMouseOut = function()
{
    ++this.outEv;
    this.log("MouseOut " + this.outEv);
}
KysReporter.prototype.onCycleEnd = function()
{
    this.log("Cycle End (" + this.cycle + ")");
    this.sendReport();
    this.startCycle();
}
KysReporter.prototype.sendReport = function()
{
    if (this.pixInfo && this.pixInfo.hasOwnProperty("url") && this.pixInfo.url)
    {
        this.log("Sending report");
        (new Image()).src = this.pixInfo.url + "?id=" + this.crId + "&over=" + this.overEv + "&out=" + this.outEv;
    }
    else
    {
        this.log("Error in pixel info");
		this.applySrc();
    }
}
KysReporter.start = function(frId,crId,minIntr,pr,maxCycles,pixInfo,doLog, failOptions)
{
    KysReporter.crfr = document.getElementById(frId);
    if (KysReporter.crfr)
        KysReporter.rep = new KysReporter(KysReporter.crfr,crId,minIntr,pr,maxCycles,pixInfo,doLog,failOptions);
    else
        setTimeout(function() { KysReporter.start(frId,crId,minIntr,pr,maxCycles,pixInfo,doLog,failOptions); }, 500);
}
