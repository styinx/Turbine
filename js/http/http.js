class Http
{
    constructor()
    {
        this.request = new XMLHttpRequest();
    }

    open(method, script, async, user = null, password = null)
    {
        this.request.open(method, script, async, user, password);
        return this;
    }

    setRequestHeader(header, value = null)
    {
        if(typeof header === "string" && typeof value === "string")
        {
            this.request.setRequestHeader(header, value);
        }
        else
        {
            if(header instanceof Array && value instanceof Array)
            {
                for(let i = 0; i < Math.min(header.length, value.length); ++i)
                {
                    this.setRequestHeader(header[i], value[i]);
                }
            }
            else if(header instanceof Object)
            {
                for(let i in header)
                {
                    if(i instanceof Object)
                    {
                        this.setRequestHeader(i);
                    }
                    else if(typeof i === "string")
                    {
                        let key = Object.keys(header).toString();
                        this.setRequestHeader(key, header[key]);
                    }
                }
            }
        }
        return this;
    }

    send(data)
    {
        if(data instanceof Object)
        {
            if(Util !== undefined)
            {
                data = Util.buildURL(data);
            }
            else
            {
                console.warn("Util Script is missing. Data could not be encoded.");
            }
        }
        else if(typeof data === "string")
        {
            this.request.send(data);
        }
        return this;
    }

    onReadyStatechange(callback, parameter = null)
    {
        this.request.onreadystatechange = function()
        {
            if(this.request.status === 200 && this.request.readyState === 4)
            {
                callback(parameter);
            }
        };
        return this;
    }
}