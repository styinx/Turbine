let ORIENTATION = {
    "VERTICAL":   0,
    "HORIZONTAL": 1
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
                           {"width": "100%"},
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
        super("img");
        this.setAttribute("src", path);
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

class FileUpload extends Widget
{
    constructor()
    {
        super("input");

        this.container.type = "file";
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
                let key = Object.keys(values[i])
                                .toString();
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

        this.orientation = (orientation === ORIENTATION.HORIZONTAL) ? orientation : ORIENTATION.VERTICAL;

        this.input = document.createElement("input");
        this.input.setAttribute("type", "range");
        this.input.setAttribute("orient", (orientation === ORIENTATION.HORIZONTAL) ? "horizontal" : "vertical");
        this.input.setAttribute("min", min);
        this.input.setAttribute("max", max);
        this.input.setAttribute("step", step);
        this.input.setAttribute("value", value);

        if(this.orientation === ORIENTATION.HORIZONTAL)
        {
            this.input.style.marginLeft = "0";
            this.input.style.marginRight = "0";
            this.input.style.paddingLeft = "0";
            this.input.style.paddingRight = "0";
            this.input.style.width = "100%";
        }
        else if(this.orientation === ORIENTATION.VERTICAL)
        {
            this.input.style.marginTop = "0";
            this.input.style.marginBottom = "0";
            this.input.style.paddingTop = "0";
            this.input.style.paddingBottom = "0";
            this.input.style.height = "100%";
        }

        this.container.appendChild(this.input);
    }
}

class ProgressBar extends Widget
{
    constructor(orientation, value = 0)
    {
        super("div");

        this.orientation = (orientation === ORIENTATION.HORIZONTAL) ? orientation : ORIENTATION.VERTICAL;
        this.value = value;
        this.text = new Label(value + "%");
        this.progress = new Widget("div");

        this.text.setStyle("position", "absolute");
        this.text.setStyle("padding", "0");
        this.text.setStyle("margin", "0");
        this.text.setStyle("top", "0");
        this.text.setStyle("left", "0");
        this.text.setStyle("border", "none");
        this.text.setStyle("height", "100%");
        this.text.setStyle("width", "100%");
        this.text.setStyle("text-align", "center");

        this.progress.setStyle("position", "absolute");
        this.progress.setStyle("padding", "0");
        this.progress.setStyle("margin", "0");
        this.progress.setStyle("top", "0");
        this.progress.setStyle("left", "0");
        this.progress.setStyle("border", "none");
        this.progress.setStyle("background", "#00CC00");

        this.setStyle("position", "relative");

        if(this.orientation === ORIENTATION.HORIZONTAL)
        {
            this.setStyle("height", "1em");
            this.setStyle("min-width", "100px");
            this.progress.setStyle("width", value + "%");
            this.progress.setStyle("height", "100%");
        }
        else if(this.orientation === ORIENTATION.VERTICAL)
        {
            this.setStyle("width", "1em");
            this.setStyle("min-height", "100px");
            this.text.setStyle("writing-mode", "vertical-rl");
            this.text.setStyle("text-orientation", "mixed");
            this.progress.setStyle("width", "100%");
            this.progress.setStyle("height", value + "%");
        }

        this.container.appendChild(this.progress.get())
        this.container.appendChild(this.text.get())
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

class DropArea extends Widget
{
    constructor(text)
    {
        super("div");

        let that = this;
        this.content = [];
        this.setInnerText(text);

        this.setStyles([
                           {"border": "1px dashed black"},
                           {"text-align": "center"}
                       ]);

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

class Layout extends Widget
{
    constructor()
    {
        super("table");
        this.children = null;
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