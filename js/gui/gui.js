let ORIENTATION = {
    "VERTICAL":   0,
    "HORIZONTAL": 1
};

let DIRECTION = {
    "TOP_DOWN":   0,
    "BOTTOM_UP":  1,
    "LEFT_RIGHT": 2,
    "RIGHT_LEFT": 3
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

        this.setStyles([
                           {"width": "calc(100% - 2px)"},
                           {"border": "1px solid black"}
                       ]);
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

    setInnerText(text)
    {
        this.container.innerText = text;
        return this;
    }

    setInnerHTML(text)
    {
        this.container.innerHTML = text;
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

    setAttribute(key, value)
    {
        if(value === undefined && key instanceof Object)
        {
            let obj_key = Object.keys(key)
                                .toString();
            if(this.container.hasOwnProperty(obj_key))
            {
                this.container[obj_key] = key[obj_key];
            }
        }
        else
        {
            if(this.container.hasOwnProperty(key))
            {
                this.container[key] = value;
            }
        }
        return this;
    }

    setAttributes(styles)
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

    setStyle(key, value)
    {
        if(value === undefined && key instanceof Object)
        {
            let obj_key = Object.keys(key)
                                .toString();
            if(this.container.style.hasOwnProperty(obj_key))
            {
                this.container.style[obj_key] = key[obj_key];
            }
        }
        else
        {
            if(this.container.style.hasOwnProperty(key))
            {
                this.container.style[key] = value;
            }
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

    onClick(callback)
    {
        this.container.addEventListener("click", callback);
        return this;
    }
}

class MainWidget extends Widget
{
    constructor()
    {
        super("div");

        this.setStyles([
                           {"position": "absolute"},
                           {"top": "0"},
                           {"left": "0"},
                           {"margin": "0"},
                           {"padding": "0"},
                           {"width": "100%"},
                           {"height": "100%"},
                           {"border": "none"},
                           {"overflow": "scroll"}
                       ]);
    }

    attach(widget)
    {
        if(widget instanceof Widget)
        {
            this.container.innerHTML = "";
            this.container.appendChild(widget.get());
        }
        return this;
    }
}

class Image extends Widget
{
    constructor(path)
    {
        super("div");
        this.image = new Widget("img");
        this.image.setAttribute("src", path);

        this.image.setStyle({"border": "none"});

        this.container.appendChild(this.image.get());
    }
}

class Filler extends Widget
{
    constructor()
    {
        super("div");

        this.setStyles([
                           {"border": "none"},
                           {"height": "1em"},
                           {"width": "1em"},
                           {"margin": "auto"}
                       ]);
    }
}

class Label extends Widget
{
    constructor(text)
    {
        super("div");

        this.text = new Widget("p");
        this.text.setInnerHTML(text);

        this.text.setStyle({"border": "none"});

        this.container.appendChild(this.text.get());
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
    constructor(placeholder = "")
    {
        super("div");

        this.input = new Widget("input");

        this.input.setAttribute("placeholder", placeholder);
        this.input.container.type = "text";

        this.container.appendChild(this.input.get());
    }
}

class FileUpload extends Widget
{
    constructor()
    {
        super("div");

        this.input = new Widget("input");
        this.input.container.type = "file";

        this.input.setStyle({"border": "none"});

        this.container.appendChild(this.input.get());
    }
}

class Select extends Widget
{
    constructor(title, values)
    {
        super("div");

        this.select = new Widget("select");

        if(title)
        {
            let caption = new Widget("option");
            caption.setAttribute("selected", true);
            caption.setAttribute("disabled", true);
            caption.setInnerHTML(title);
            this.select.container.appendChild(caption.get());
        }

        for(let i = 0; i < values.length; ++i)
        {
            let opt = new Widget("option");

            if(typeof values[i] === "string")
            {
                opt.setAttribute("value", values[i]);
                opt.setInnerHTML(values[i]);
            }
            else
            {
                let key = Object.keys(values[i])
                                .toString();
                opt.setAttribute("value", key);
                opt.setInnerHTML(values[i][key]);
            }

            this.select.container.appendChild(opt.get());
        }

        this.select.setStyle({"border": "none"});

        this.container.appendChild(this.select.get());
    }
}

class Checkbox extends Widget
{
    constructor(text)
    {
        super("div");

        this.input = new Widget("input");
        this.label = new Widget("label");

        this.input.container.type = "checkbox";
        this.label.setInnerHTML(text);

        this.input.setStyles([{"width": "auto"}, {"border": "none"}, {"display": "inline-block"}]);
        this.label.setStyles([{"width": "auto"}, {"border": "none"}, {"display": "inline-block"}]);

        this.container.appendChild(this.input.get());
        this.container.appendChild(this.label.get());
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

        this.input = new Widget("input");
        this.label = new Widget("label");

        this.input.container.type = "radio";
        this.label.setInnerHTML(text);

        this.input.setStyles([{"width": "auto"}, {"border": "none"}, {"display": "inline-block"}]);
        this.label.setStyles([{"width": "auto"}, {"border": "none"}, {"display": "inline-block"}]);

        this.container.appendChild(this.input.get());
        this.container.appendChild(this.label.get());
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

        this.orientation = (orientation === ORIENTATION.HORIZONTAL) ? orientation : ORIENTATION.VERTICAL;

        this.input = new Widget("input");
        this.input.container.type = "range";
        this.input.setAttribute("orient", (orientation === ORIENTATION.HORIZONTAL) ? "horizontal" : "vertical");
        this.input.setAttribute("min", min);
        this.input.setAttribute("max", max);
        this.input.setAttribute("step", step);
        this.input.setAttribute("value", value);

        if(this.orientation === ORIENTATION.HORIZONTAL)
        {
            this.input.setStyles([
                                     {"marginLeft": "0"},
                                     {"marginRight": "0"},
                                     {"paddingLeft": "0"},
                                     {"paddingRight": "0"},
                                     {"width": "100%"}
                                 ]);
        }
        else if(this.orientation === ORIENTATION.VERTICAL)
        {
            this.input.setStyles([
                                     {"marginTop": "0"},
                                     {"marginBottom": "0"},
                                     {"paddingTop": "0"},
                                     {"paddingBottom": "0"},
                                     {"height": "100%"}
                                 ]);
        }

        this.container.appendChild(this.input.get());
    }
}

class ProgressBar extends Widget
{
    constructor(orientation, value = 0)
    {
        super("div");

        this.orientation = (orientation === ORIENTATION.HORIZONTAL) ? orientation : ORIENTATION.VERTICAL;
        this.value = value;
        this.text = new Widget("p");
        this.progress = new Widget("div");

        this.text.setInnerHTML(value + "%");

        this.text.setStyles([
                                {"position": "absolute"},
                                {"padding": "0"},
                                {"margin": "0"},
                                {"top": "0"},
                                {"left": "0"},
                                {"border": "none"},
                                {"height": "100%"},
                                {"width": "100%"},
                                {"text-align": "center"}
                            ]);

        this.progress.setStyles([
                                    {"position": "absolute"},
                                    {"left": "0"},
                                    {"padding": "0"},
                                    {"margin": "0"},
                                    {"border": "none"},
                                    {"background": "#00CC00"}
                                ]);

        this.setStyle({"position": "relative"});

        if(this.orientation === ORIENTATION.HORIZONTAL)
        {
            this.setStyles([
                               {"height": "1em"},
                               {"min-width": "100px"}
                           ]);
            this.progress.setStyles([
                                        {"top": "0"},
                                        {"width": value + "%"},
                                        {"height": "100%"}
                                    ]);
        }
        else if(this.orientation === ORIENTATION.VERTICAL)
        {
            this.setStyles([
                               {"width": "1em"},
                               {"min-height": "100px"}
                           ]);
            this.text.setStyles([
                                    {"writing-mode": "vertical-rl"},
                                    {"text-orientation": "mixed"}
                                ]);
            this.progress.setStyles([
                                        {"bottom": "0"},
                                        {"width": "100%"},
                                        {"height": value + "%"}
                                    ]);
        }

        this.container.appendChild(this.progress.get());
        this.container.appendChild(this.text.get());
    }
}

class TabWidget
{

}

class Menu_etc
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

class FileDropArea extends Widget
{
    constructor(text)
    {
        super("div");

        let that = this;
        this.content = [];
        this.text = new Label(text);

        this.setStyles([
                           {"width": "100%"},
                           {"height": "100%"},
                           {"border": "1px dashed black"},
                           {"text-align": "center"}
                       ]);

        this.text.setStyles([{"border": "none"}]);

        this.container.appendChild(this.text.get());

        this.container.addEventListener("drop", function(event)
        {
            event.preventDefault();

            if(event.dataTransfer.items)
            {
                for(var i = 0; i < event.dataTransfer.items.length; i++)
                {
                    let el = {};
                    if(event.dataTransfer.items[i].kind === 'file')
                    {
                        var file = event.dataTransfer.items[i].getAsFile();
                        el.type = event.dataTransfer.items[i].kind;
                        el.name = file.name;
                    }
                    that.content.push(el);
                }
            }
            else
            {
                for(var i = 0; i < event.dataTransfer.files.length; i++)
                {
                    let el = {};
                    el.name = event.dataTransfer.files[i].name;
                    that.content.push(el);
                }
            }

            if(event.dataTransfer.items)
            {
                event.dataTransfer.items.clear();
            }
            else
            {
                event.dataTransfer.clearData();
            }
        });

        this.container.addEventListener("dragover", function(event)
        {
            event.preventDefault();
        });
    }
}

class DragArea extends Widget
{
    constructor(element = undefined)
    {
        super("div");

        let that = this;
        this.child = element;
        this.container.draggable = true;
        this.setStyles([
                           {"min-width": "1em"},
                           {"min-height": "1em"},
                           {"border": "1px dashed black"},
                       ]);

        this.container.appendChild(element.get());

        this.container.addEventListener("dragstart", function(event)
        {
            if(that.child !== undefined)
            {
                if(that.child instanceof Widget)
                {
                    event.dataTransfer.setData("data", that.child.container.id);
                }
                else
                {
                    event.dataTransfer.setData("data", that.child.id);
                }
            }
        });
    }
}

class DropArea extends Widget
{
    constructor()
    {
        super("div");
        let that = this;

        this.setStyles([
                           {"min-width": "1em"},
                           {"min-height": "1em"},
                           {"border": "1px dashed black"},
                       ]);

        this.container.addEventListener("dragover", function(event)
        {
            event.preventDefault();
        });

        this.container.addEventListener("drop", function(event)
        {
            event.preventDefault();
            let element = document.getElementById(event.dataTransfer.getData("data"));
            if(element)
            {
                element.parentNode.innerHTML = "";
                that.container.innerHTML = "";
                that.container.appendChild(element);
            }
            else
            {
                console.warn("ID missing for drag element.");
            }
        });
    }
}

class DragDropArea extends Widget
{
    constructor(element)
    {
        super("div");
        let that = this;
        this.child = element;
        this.container.draggable = true;

        this.setStyles([
                           {"min-width": "1em"},
                           {"min-height": "1em"},
                           {"border": "1px dashed black"},
                       ]);

        if(element)
        {
            this.container.appendChild(element.get());
        }

        this.container.addEventListener("dragstart", function(event)
        {
            if(that.child !== undefined)
            {
                if(that.child instanceof Widget)
                {
                    event.dataTransfer.setData("data", that.child.container.id);
                }
                else
                {
                    event.dataTransfer.setData("data", that.child.id);
                }
            }
        });

        this.container.addEventListener("dragover", function(event)
        {
            event.preventDefault();
        });

        this.container.addEventListener("drop", function(event)
        {
            event.preventDefault();
            let element = document.getElementById(event.dataTransfer.getData("data"));

            if(element)
            {
                element.parentNode.innerHTML = "";
                that.child = element;
                that.container.innerHTML = "";
                that.container.appendChild(element);
            }
            else
            {
                console.warn("ID missing for drag element.");
            }
        });
    }
}

class Layout extends Widget
{
    constructor()
    {
        super("table");
        this.children = null;

        this.setStyles([
                           {"padding": "0"},
                           {"border-spacing": "0"},
                           {"border-collapse": "separate"}
                       ]);
    }
}

class SplitterHandle extends Widget
{
    constructor(orientation)
    {
        super("div");

        this.orientation = (orientation === ORIENTATION.HORIZONTAL) ? orientation : ORIENTATION.VERTICAL;

        if(this.orientation === ORIENTATION.HORIZONTAL)
        {
            this.container.innerHTML = "&nbsp;";
            this.setStyles([
                               {"width": "0.1em"},
                               {"height": "100%"},
                               {"cursor": "col-resize"}
                           ]);
        }
        else if(this.orientation === ORIENTATION.VERTICAL)
        {
            this.setStyles([
                               {"width": "100%"},
                               {"height": "0.1em"},
                               {"cursor": "row-resize"}
                           ]);
        }

        this.setStyle("margin", "auto");
        this.setStyle("background", "black");
    }
}

class Splitter extends Layout
{
    constructor(orientation)
    {
        super();
        this.children = [];
        this.orientation = (orientation === ORIENTATION.HORIZONTAL) ? orientation : ORIENTATION.VERTICAL;

        this.setStyle({"border": "none"});
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

                let row_head = this.container.childNodes[0];
                let col = document.createElement("td");
                col.appendChild(element.get());

                // Insert the element
                if(index === -1)
                {
                    row_head.appendChild(col);
                }
                else
                {
                    index = Math.min(row_head.childNodes.length, index);
                    row_head.insertBefore(col, row_head.childNodes[index]);
                }

                // Insert the drag handle
                if(row_head.childNodes.length > 1)
                {
                    let pane_col = document.createElement("td");
                    let handle = new SplitterHandle(this.orientation);
                    pane_col.appendChild(handle.get());

                    if(index === -1)
                    {
                        row_head.insertBefore(pane_col, row_head.childNodes[row_head.childNodes.length - 1]);
                    }
                    else
                    {
                        if(index === 0)
                        {
                            row_head.insertBefore(pane_col, row_head.childNodes[index + 1]);
                        }
                        else
                        {
                            row_head.insertBefore(pane_col, row_head.childNodes[index]);
                        }
                    }
                }
            }
            else if(this.orientation === ORIENTATION.VERTICAL)
            {
                let row = document.createElement("tr");
                let col = document.createElement("td");
                row.appendChild(col);
                col.appendChild(element.get());

                // Insert the element
                if(index === -1)
                {
                    this.container.appendChild(row);
                }
                else
                {
                    index = Math.min(this.container.childNodes.length, index);
                    this.container.insertBefore(row, this.container.childNodes[index]);
                }

                // Insert the drag handle
                if(this.container.childNodes.length > 1)
                {
                    let pane_row = document.createElement("td");
                    let handle = new SplitterHandle(this.orientation);
                    pane_row.appendChild(handle.get());

                    if(index === -1)
                    {
                        this.container.insertBefore(pane_row, this.container.childNodes[this.container.childNodes.length - 1]);
                    }
                    else
                    {
                        if(index === 0)
                        {
                            this.container.insertBefore(pane_row, this.container.childNodes[index + 1]);
                        }
                        else
                        {
                            this.container.insertBefore(pane_row, this.container.childNodes[index]);
                        }
                    }
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

        for(let y = 0; y < rows; ++y)
        {
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

    getWidget(x, y)
    {
        return this.children[{x: y}];
    }

    addWidget(element, x, y)
    {
        if(element instanceof Widget)
        {
            if(x < this.cols && y < this.rows)
            {
                this.container.childNodes[y].childNodes[x].innerHTML = "";
                this.container.childNodes[y].childNodes[x].appendChild(element.get());

                this.children[{x: y}] = element;
            }
        }
        return this;
    }
}