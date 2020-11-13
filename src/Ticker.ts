/**
 * The Ticker class represents the part of the ClockDisplay that acts at a 
 * specific time interval. At that interval, it calls the `step()` method of
 * the associated `Animator` object. The interval can be set via the 
 * constructor in milliseconds. 
 * 
 * There are 1000 milliseconds in one second.
 * 
 * This class deals with the complexity of the `setInterval` and `clearInterval`
 * functions in Javascript.
 * 
 * @see https://www.w3schools.com/js/js_timing.asp
 * 
 * @author BugSlayer
 */
class Ticker {

    /**
     * The interval in ms of this Ticker.
     */
    private interval: number;

    /**
     * A reference to the interval timer so it can be stopped.
     */
    private timerId: number;

    /**
     * A reference to the Animator object to call the `step()` method on.
     */
    private stepFunction: Function;

    /**
     * Construct Ticker.
     * 
     * @param animator 
     * @param interval optional, default set to 1000 milliseconds
     */
    public constructor(stepFunction: Function, interval: number = 1000) {
        this.stepFunction = stepFunction;
        this.interval = interval;
    }

    /**
     * Returns `true` if the interval timer is running.
     */
    public isRunning(): boolean {
        return this.timerId!=null;
    }

    /**
     * Toggles the interval timer. If the timer is running, it will stop the 
     * timer. Otherwise it will start the timer.
     */
    public toggle() {
        if (this.isRunning()) {
            clearInterval(this.timerId);   
            this.timerId = null; //so this object knows the timer isn't running.    
        } else {
            this.timerId = setInterval(() => {
                if (this.stepFunction) {
                    this.stepFunction();
                }
            }, this.interval);        
        }
    }
    
}