class Util
{
    /**
     * Returns an array of numbers based on the input.
     *
     * Examples:
     *      (1,5,1) -> [1,2,3,4,5]
     *      ("1:3:2") -> [1,3]
     *      ("1:3,5:7") -> [1,2,3,5,6,7]
     *
     * @param start : (number|string)
     * @param end : number
     * @param step : (number|array)
     * @returns {Array}
     */
    static range(start, end = undefined, step = 1)
    {
        let step_val = step;
        let step_index = 0;
        end = end || start;

        if(isNaN(start))
        {
            let el = start.split(",");
            let range = [];

            for(let i = 0; i < el.length; ++i)
            {
                let res = el[i].split(/[:\-]/);

                start = res[0];
                end = res[1] || start;
                step = res[2] || 1;

                range = range.concat(this.range(parseInt(start), parseInt(end), parseInt(step)));
            }
            return range;
        }
        else if(!isNaN(start) && !isNaN(end))
        {
            if(step.length > 1 && step_index < step.length)
            {
                step_val = step[Math.min(step.length, step_index++)];
            }
            let range = [];
            if(end < start)
            {
                for(let i = start; i >= end; i -= step_val)
                {
                    range.push(i);
                    if(step.length > 1 && step_index < step.length)
                    {
                        step_val = step[Math.min(step.length, step_index++)];
                    }
                }
            }
            else
            {
                for(let i = start; i <= end; i += step_val)
                {
                    range.push(i);
                    if(step.length > 1 && step_index < step.length)
                    {
                        step_val = step[Math.min(step.length, step_index++)];
                    }
                }
            }
            return range;
        }

        return [];
    }


    /**
     * Reads the url and packs the contents into a dictionary.
     * @param url
     * @returns {{}}
     */
    static parseURL(url = undefined)
    {
        let parameters = {};
        url = url || window.location.href;
        url = url.substr(url.indexOf("?") + 1);
        if(url !== "")
        {
            let args = url.split("&");

            for(let i = 0; i < args.length; ++i)
            {
                let pair = args[i].split("=");
                parameters[pair[0]] = pair[1];
            }
        }
        return parameters;
    }
}