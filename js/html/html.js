class Util
{
    static IS(element, instance)
    {
        return element instanceof instance;
    }

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

let ORIENTATION = {
    "VERTICAL" : 0,
    "HORIZONTAL" : 1
};

let ID = 0;

/**
 * Represents an instance of one HTML node and its children.
 */
class Widget
{
    constructor(tag)
    {
        this.id = ID++;
        this.container = null;
        this.child = null;
        this.parent = null;

        this.setTag(tag);
    }

    get()
    {
        return this.container;
    }

    setChild(child)
    {
        this.child = child;
        return this;
    }

    setParent(parent)
    {
        this.parent = parent;
        return this;
    }

    setAttribute(key, value)
    {
        if(this.container.hasOwnProperty(key))
        {
            this.container[key] = value;
        }
        return this;
    }

    setInnerText(text)
    {
        this.container.innerText = text;
        return this;
    }

    setTag(tag)
    {
        this.container = document.createElement(tag);
        return this;
    }

    setId(id)
    {
        this.container.id = id;
        return this;
    }

    setClassName(class_name)
    {
        this.container.className = class_name;
        return this;
    }

    setName(name)
    {
        this.container.name = name;
        return this;
    }

    setStyle(key, value)
    {
        if(this.container.style.hasOwnProperty(key))
        {
            this.container.style[key] = value;
        }
        return this;
    }

    setStyles(styles)
    {
        if(styles instanceof Array)
        {
            for(let i = 0; i < styles.length; ++i)
            {
                this.setStyles(styles[i]);
            }
        }
        else
        {
            for(let key in styles)
            {
                this.setStyle(key, styles[key]);
            }
        }
        return this;
    }
}

class Image extends Widget
{
    constructor(path)
    {
        super("img");
        this.setAttribute("src", path);
    }
}

class Label extends Widget
{
    constructor(text)
    {
        super("p");
        this.container.innerHTML = text;
    }
}

class Button extends Widget
{
    constructor(text)
    {
        super("button");
        this.container.innerHTML = text;
    }
}

class ToggleButton extends Widget
{
    constructor(text)
    {
        super("div");

        this.input = document.createElement("input");
        this.label = document.createElement("label");

        this.input.type = "checkbox";
        this.input.style.display = "none";
        this.label.innerHTML = text;

        this.container.appendChild(this.input);
        this.container.appendChild(this.label);
    }
}

class TextInput extends Widget
{
    constructor()
    {
        super("input");
        this.container.type = "text";
    }
}

class Select extends Widget
{
    constructor(title, values)
    {
        super("select");

        if(title)
        {
            let caption = document.createElement("option");
            caption.selected = true;
            caption.disabled = true;
            caption.innerHTML = title;
            this.container.appendChild(caption);
        }

        for(let i = 0; i < values.length; ++i)
        {
            let opt = document.createElement("option");

            if(typeof values[i] === "string")
            {
                opt.value = values[i];
                opt.innerHTML = values[i];
            }
            else
            {
                let key = Object.keys(values[i]).toString();
                opt.value = key;
                opt.innerHTML = values[i][key];
            }

            this.container.appendChild(opt);
        }
    }
}

class Checkbox extends Widget
{
    constructor(text)
    {
        super("div");

        this.input = document.createElement("input");
        this.label = document.createElement("label");

        this.input.type = "checkbox";
        this.label.innerHTML = text;

        this.container.appendChild(this.input);
        this.container.appendChild(this.label);
    }
}

class CheckboxGroup extends Widget
{
    constructor(values)
    {
        super("div");


    }
}

class Radio extends Widget
{
    constructor(text)
    {
        super("div");

        this.input = document.createElement("input");
        this.label = document.createElement("label");

        this.input.type = "radio";
        this.label.innerHTML = text;

        this.container.appendChild(this.input);
        this.container.appendChild(this.label);
    }
}

class RadioGroup extends Widget
{
    constructor(values)
    {
        super("div");


    }
}

class Slider extends Widget
{
    constructor(orientation, min, max, step, value)
    {
        super("div");

        this.input = document.createElement("input");
        this.input.setAttribute("type", "range");
        this.input.setAttribute("orient", (orientation === ORIENTATION.HORIZONTAL) ? "horizontal" : "vertical");
        this.input.setAttribute("min", min);
        this.input.setAttribute("max", max);
        this.input.setAttribute("step", step);
        this.input.setAttribute("value", value);

        this.container.appendChild(this.input);
    }
}

class Splitter_TabWidget_Progressbar_Menu
{

}

class Group extends Widget
{
    constructor()
    {
        super("div");
    }

    append(element)
    {
        if(element instanceof Widget)
        {
            this.container.appendChild(element.get());
        }
        else
        {
            this.container.appendChild(element);
        }
        return this;
    }
}

class Layout extends Widget
{
    constructor()
    {
        super("table");
        this.children = null;
    }
}

class Box extends Layout
{
    constructor(orientation)
    {
        super();
        this.orientation = (orientation === ORIENTATION.HORIZONTAL) ? orientation : ORIENTATION.VERTICAL;
        this.children = [];
    }

    addWidget(element, index = -1)
    {
        if(element instanceof Widget)
        {
            if(this.orientation === ORIENTATION.HORIZONTAL)
            {
                if(this.container.childNodes.length === 0)
                {
                    this.container.appendChild(document.createElement("tr"));
                }

                let col = document.createElement("td");
                col.appendChild(element.get());

                if(index === -1)
                {
                    this.container.childNodes[0].appendChild(col);
                }
                else
                {
                    index = Math.min(this.container.childNodes[0].childNodes.length, index);
                    this.container.childNodes[0].insertBefore(col, this.container.childNodes[0].childNodes[index]);
                }
            }
            if(this.orientation === ORIENTATION.VERTICAL)
            {
                let row = document.createElement("tr");
                let col = document.createElement("td");
                row.appendChild(col);
                col.appendChild(element.get());

                if(index === -1)
                {
                    this.container.appendChild(row);
                }
                else
                {
                    index = Math.min(this.container.childNodes.length, index);
                    this.container.insertBefore(row, this.container.childNodes[index]);
                }
            }

            if(index === -1)
            {
                this.children.push(element);
            }
            else
            {
                this.children.splice(index, 0, element)
            }
        }
        return this;
    }
}

class Grid extends Layout
{
    constructor(cols, rows)
    {
        super();
        this.children = [];
        this.cols = cols;
        this.rows = rows;
        this.setStyle("width", "100%");

        for(let y = 0; y < rows; ++y)
        {
            this.children[y] = [];
            let row = document.createElement("tr");
            this.container.appendChild(row);
            for(let x = 0; x < rows; ++x)
            {
                let col = document.createElement("td");
                col.appendChild(document.createElement("p"));
                row.appendChild(col);
            }
        }
    }

    addWidget(element, x, y)
    {
        if(element instanceof Widget)
        {
            if(x < this.cols && y < this.rows)
            {
                this.container.childNodes[y].childNodes[x].innerHTML = "";
                this.container.childNodes[y].childNodes[x].appendChild(element.get());

                this.children[x][y] = element;
            }
        }

        return this;
    }
}