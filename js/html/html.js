class Document
{
    /**
     *
     * @param selector
     * @returns {Array}
     */
    static get(selector)
    {
        let elements = [];
        let matches = [];
        let needle = "";

        if(typeof selector === "string")
        {
            if(selector[0] === "#")
            {
                elements = document.getElementById(selector.substr(1));
            }
            else
            {
                let indices = [0];
                let all = false;
                needle = selector.substr(1);

                if(selector.indexOf("[") > -1)
                {
                    let start = selector.indexOf("[");
                    let end = selector.indexOf("]");
                    let range_str = selector.substr(start, end - start);

                    if(range_str.indexOf("*") > -1)
                    {
                        all = true;
                    }
                    else
                    {
                        indices = Util.range(selector.substr(start + 1, end - start - 1));
                    }
                    needle = selector.substr(end + 1);
                }

                if(selector[0] === ".")
                {
                    matches = document.getElementsByClassName(needle);
                }
                else if(selector[0] === "<")
                {
                    matches = document.getElementsByTagName(needle);
                }
                else if(selector[0] === "'")
                {
                    matches = document.getElementsByName(needle);
                }
                else if(selector[0] === "$")
                {
                    matches = document.querySelectorAll(needle);
                }
                else
                {
                    needle = selector;
                }

                if(all)
                {
                    indices = Util.range(0, matches.length - 1, 1);
                }

                for(let i = 0; i < indices.length; ++i)
                {
                    elements.push(matches[indices[i]]);
                }
            }
        }
        return elements;
    }

    static append(element)
    {
        document.body.appendChild(element);
    }
}