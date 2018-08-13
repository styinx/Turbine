Timer.getTimestamp = function()
{
    return Date.now();
};

var TIMER_STATE =
{
    STOPPED : 0,
    STARTED : 1,
    PAUSED : 2
};

function Timer()
{
    this.start = function()
    {
        this.timer_started = Timer.getTimestamp();
        if(this.state !== TIMER_STATE.STARTED)
        {
            this.elapsed_time = 0;
            this.state = TIMER_STATE.STARTED;
        }
        else
        {
            this.state = TIMER_STATE.STOPPED;
            return this.start();
        }
        return this.timer_started;
    };

    this.pause = function()
    {
        this.timer_paused = Timer.getTimestamp();
        if(this.state === TIMER_STATE.STARTED)
        {
            var time_diff = this.timer_paused - this.timer_started;
            this.active_time += time_diff;
            this.elapsed_time += time_diff;
            this.state = TIMER_STATE.PAUSED;
        }
        return this.timer_paused;
    };

    this.resume = function()
    {
        this.timer_resumed = Timer.getTimestamp();
        if(this.state === TIMER_STATE.PAUSED)
        {
            var time_diff = this.timer_resumed - this.timer_paused;
            this.paused_time += time_diff;
            this.elapsed_time += time_diff;
            this.state = TIMER_STATE.STARTED;
        }
        return this.timer_resumed;
    };

    this.stop = function()
    {
        this.timer_stopped = Timer.getTimestamp();
        if(this.state === TIMER_STATE.STOPPED)
        {
            var time_diff = (this.timer_resumed > this.timer_started) ? this.timer_resumed : this.timer_started;
            if(this.state !== TIMER_STATE.PAUSED)
            {
                this.active_time += this.timer_stopped - time_diff;
            }
            this.elapsed_time += this.timer_stopped - time_diff;
            this.state = TIMER_STATE.STOPPED;
        }
        return this.timer_stopped;
    };

    this.state = 0;
    this.elapsed_time = 0;
    this.active_time = 0;
    this.paused_time = 0;
    this.timer_started = 0;
    this.timer_paused = 0;
    this.timer_resumed = 0;
    this.timer_stopped = 0;
    this.start();
}