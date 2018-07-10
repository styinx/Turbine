/**
 * This is the default style of the framework.
 * @TODO the default look should look like normal CSS
 */
var DEFAULT_STYLE =
    {
        Button:
        {
            background:   "",
            border:       "",
            borderRadius: "",
            fontSize:     "",
            margin:       "",
            minWidth:     "",
            outline:      "",
            padding:      ""
        },
        Text:
        {
            fontSize: "12pt"
        },
        TextArea:
        {
            outline: "0",
            border: "1px solid black",
            background: "#FFFFFF",
            lineHeight: "12px",
            fontSize: "12px"
        },
        TextEditLineNumber:
        {
            display: "block",
            fontSize: "12px",
            lineHeight: "12px",
            textAlign: "right"
        },
        TextEditLineNumbers:
        {
            background: "#AAAAAA",
            borderRight: "1px solid black",
            color: "#333333",
            padding: "5px 3px 5px 3px"
        },
        TextEditTextArea:
        {
            border: "none",
            fontSize: "12px",
            lineHeight: "12px",
            overflow: "hidden",
            padding: "5px 2px 5px 2px",
            resize: "none",
            width: "100%"
        },
        TextEdit:
        {
            border: "1px solid black",
            background: "#EEEEEE",
            display: "flex",
            fontFamily: "Consolas, monaco, monospace",
            minHeight: "500px",
            overflow: "auto",
            width: "calc(100% - 2px)"
        },
        CollapseWidget:
        {
            background: "#EEEEEE",
            border: "1px solid black",
            borderRadius: "3px"
        },
        TextInputWidget:
        {
            background:   "",
            border:       "",
            borderBottom: "",
            fontSize:     "",
            margin:       "",
            outline:      "",
            padding:      ""
        },
        TableWidget:
        {
            border:         "1px solid black",
            borderCollapse: "collapse",
            borderStyle:    "",
            margin:         ""
        },
        TableWidgetHead:
        {
            background: ""
        },
        TableWidgetBody:
        {
            background: ""
        },
        TableWidgetHeaderRow:
        {
            borderBottom: ""
        },
        TableWidgetHeader:
        {
            border:   "1px solid black",
            minWidth: "",
            padding:  ""
        },
        TableWidgetRow:
        {
            borderBottom: ""
        },
        TableWidgetCell:
        {
            border:    "1px solid black",
            padding:   "",
            textAlign: ""
        },
        ListWidget:
        {
            background:   "",
            border:       "",
            borderRadius: ""
        },
        ListWidgetEntry:
        {
            padding: ""
        },
        TabWidget:
        {
            minWidth: ""
        },
        TabWidgetHeader:
        {
            height:     "14pt",
            margin:     "",
            maxHeight:  "14pt",
            minWidth:   "",
            lineHeight: "14pt",
            whiteSpace: ""
        },
        TabWidgetTab:
        {
            background:   "",
            border:       "1px solid black",
            borderRadius: "",
            cursor:       "pointer",
            display:      "inline-block",
            float:        "left",
            fontFamily:   "Times New Roman, sans-serif",
            fontWeight:   "bold",
            height:       "",
            padding:      "0 3px 0 3px",
            textAlign:    "center",
            width:        ""
        },
        TabWidgetContent:
        {
            background: "",
            border:     "1px solid black",
            height:     "auto",
            padding:    "0",
            textAlign:  "",
            width:      ""
        }
    };

/********************
 * Helper functions *
 *******************/

/**
 * Returns a list depending on the given parameters
 * @param from
 * @param to
 * @param step
 * @returns {Array}
 */
function range(from, to, step)
{
    var l = [];
    for(var i = from; i <= to; i += step)
    {
        l.push(i);
    }
    return l;
}

/**
 * Filters a list to just even elements
 * @param list
 * @returns {Array}
 */
function even(list)
{
    var l = [];
    for(var entry = 0; entry < list.length; ++entry)
    {
        if(list[entry] % 2 === 0)
        {
            l.push(list[entry]);
        }
    }
    return l;
}

/**
 * Filters a list to just odd elements
 * @param list
 * @returns {Array}
 */
function odd(list)
{
    var l = [];
    for(var entry = 0; entry < list.length; ++entry)
    {
        if(list[entry] % 2 === 1)
        {
            l.push(list[entry]);
        }
    }
    return l;
}

function print(message)
{
    console.log(message);
}

function empty(obj)
{
    if(!obj instanceof Object)
    {
        return obj === "undefined" || obj.length === 0;
    }
}

function init(obj, def)
{
    if(typeof obj === typeof def)
    {
        if(!empty(obj))
        {
            return obj;
        }
    }
    return def;
}

/*****************
 * GUI functions *
 ****************/

/**
 *
 * @param obj
 * @param style
 */
function cascadeStyle(obj, style)
{
    if(obj.children !== undefined)
    {
        for(var child in obj.children)
        {
            var c = obj.children[child];
            if(style[c.class] !== undefined)
            {
                c.setStyles(style[c.class]);
            }
            cascadeStyle(obj.children[child], style);
        }
    }
    else if(obj.child !== null)
    {
        if(style[obj.child.class] !== undefined)
        {
            obj.child.setStyles(style[obj.child.class]);
        }
        cascadeStyle(obj.child, style);
    }
}

/**
 * TODO optimize search
 * @param id
 * @param parent
 * @returns {*}
 */
function getWidget(id, parent)
{
    id = parseInt(id);
    if(parent === undefined)
    {
        parent = GUI.doc;
    }

    if(parent !== null)
    {
        var rec_child;
        var w_id;

        if(parent.hasOwnProperty("children"))
        {
            for(var child in parent.children)
            {
                w_id = parseInt(parent.children[child].id);

                if(w_id === id)
                {
                    return parent.children[child];
                }
                rec_child = getWidget(id, parent.children[child]);
                if(rec_child !== false)
                {
                    if(rec_child !== undefined && rec_child.id === id)
                    {
                        return rec_child;
                    }
                }
            }
        }
        else
        {
            if(parent.child !== null)
            {
                w_id = parseInt(parent.child.id);
                if(w_id === id)
                {
                    return parent.child;
                }
                rec_child = getWidget(id, parent.child);
                if(rec_child !== false)
                {
                    if(rec_child !== undefined && rec_child.id === id)
                    {
                        return rec_child;
                    }
                }
            }
        }
    }


    return false;
}

/***********************
 * GUI Element classes *
 **********************/

var GUI =
{
    id : 0,
    doc : null
};

/**
 *
 * @returns {Document}
 * @constructor
 */
function Document()
{
    this.children = [];
    this.class = "Document";
    this.append = function(object)
    {
        if(object instanceof Array)
        {
            for(var c in object)
            {
                this.append(object[c]);
            }
        }
        else
        {
            this.children.push(object);
            object.parent = this;
            document.body.appendChild(object.element);
        }
        return this;
    };
    GUI.doc = this;
    return this;
}

/**
 *
 * @returns {Object}
 * @constructor
 */
function Object()
{
    this.createElement = function(type)
    {
        this.id = GUI.id++;
        this.element = document.createElement(type);
        this.setId(this.id);
        this.setClassName(this.class);
    };

    // this.getElementById = function(id)
    // {
    //     this.element = document.getElementById(id)
    // };
    //
    // this.getElement = function()
    // {
    //     this.element = document.getElementById(this.id);
    // };

    this.setStyle = function(key, value)
    {
        if(this.element.style.hasOwnProperty(key))
        {
            this.element.style[key] = value;
        }
        else
        {
            console.warn("Style has no property:" + key);
        }
        return this;
    };

    this.setStyles = function(styles)
    {
        for(var style in styles)
        {
            this.setStyle(style, styles[style]);
        }
        return this;
    };

    this.setWidgetStyle = function(style)
    {
        if(style.hasOwnProperty(this.class))
        {
            this.setStyles(style[this.class])
        }
        else
        {
            this.setStyles(style)
        }
        return this;
    };

    this.setAttribute = function(key, value)
    {
        this.element.setAttribute(key, value);
        return this;
    };

    this.setAttributes = function(attributes)
    {
        for(var attr in attributes)
        {
            this.setAttribute(attr, attributes[attr]);
        }
        return this;
    };

    this.setChild = function(object)
    {
        this.element.innerHTML = "";
        this.element.appendChild(object.element);
        this.child = object;
        object.parent = this;
        return this;
    };

    this.setId = function(id)
    {
        this.element.id = id;
        return this;
    };

    this.setClassName = function(name)
    {
        this.element.className = name;
        return this;
    };

    this.addClassName = function(name)
    {
        this.element.className += " " + name;
        return this;
    };

    this.setText = function(text)
    {
        this.element.innerHTML = text;
        return this;
    };

    this.addText = function(text)
    {
        this.element.innerHTML += text;
        return this;
    };

    this.setValue = function(value)
    {
        this.element.value = value;
        return this;
    };

    this.onClick = function(callback)
    {
        this.element.onclick = callback;
    };

    this.show = function(soft)
    {
        if(soft)
        {
            this.setStyle("display", "inline-block");
        }
        else
        {
            this.setStyle("display", "block");
        }
        return this;
    };

    this.hide = function()
    {
        this.setStyle("display", "none");
        return this;
    };

    this.setDraggable = function(draggable)
    {
        this.setAttribute("draggable", draggable);
    };

    this.getObject = function()
    {
        return this.element;
    };

    this.class = "Object";
    this.child = null;
    this.parent = null;
    this.id = -1;
    this.createElement("div");
    this.setAttribute("class", this.class);
    return this;
}

/**
 *
 * @returns {Widget}
 * @constructor
 */
function Widget()
{
    Object.call(this);
    this.class = "Widget";
    return this;
}

function Text(text)
{
    Widget.call(this);
    this.class = "Text";
    this.createElement("p");
    this.setText(text);
    this.setStyles(DEFAULT_STYLE.Text);
    return this;
}

/**
 *
 * @param text
 * @constructor
 */
function Button(text)
{
    Widget.call(this);
    this.class = "Button";
    this.createElement("button");
    this.setText(text);
    this.setStyles(DEFAULT_STYLE.Button);
    return this;
}

/**
 *
 * @param text
 * @param placeholder
 * @constructor
 */
function TextInputWidget(text, placeholder)
{
    Widget.call(this);
    this.class = "TextInputWidget";
    this.createElement("input");
    this.setValue(text);
    this.setStyles(DEFAULT_STYLE.TextInputWidget);
    this.setAttribute("type", "text");
    this.setAttribute("placeholder", placeholder);
    return this;
}

/**
 *
 * @param text
 * @param placeholder
 * @returns {TextArea}
 * @constructor
 */
function TextArea(text, placeholder)
{
    Widget.call(this);
    this.class = "TextArea";
    this.createElement("textarea");
    this.setText(init(text, ""));
    this.setStyles(DEFAULT_STYLE.TextArea);
    this.setAttribute("placeholder", init(placeholder, ""));
    return this;
}

/**
 *
 * @constructor
 */
function Layout()
{
    this.append = function(child)
    {
        if(child instanceof Array)
        {
            for(var c in child)
            {
                this.append(child[c]);
            }
        }
        else 
        {
            this.children.push(child);
            child.parent = this;
            this.element.appendChild(child.element);
        }
        return this;
    };

    this.remove = function()
    {
        this.element.removeChild(this.element.children[this.element.children.length - 1]);
        //TODO
        // this.children.splice(this.children.length - 1, 1);
        // console.log(this.children.length);
    };

    Object.call(this);
    this.children = [];
    this.class = "Layout";
    return this;
}

/**
 *
 * @param orientation
 * @returns {Box}
 * @constructor
 */
function Box(orientation)
{
    Layout.call(this);
    this.orientation = orientation;
    this.class = "Box";
    return this;
}

/**
 *
 * @constructor
 */
function TextEditLineNumber(number)
{
    Object.call(this);
    this.class = "TextEditLineNumber";
    this.createElement('span');
    this.setText(number);
    this.setStyles(DEFAULT_STYLE.TextEditLineNumber);
    return this;
}

/**
 *
 * @constructor
 */
function TextEditLineNumbers(lines)
{
    this.addLine = function()
    {
        this.append(new TextEditLineNumber((this.lines++ + 1)));
        return this;
    };

    this.removeLine = function()
    {
        this.remove();
        this.lines--;
        return this;
    };

    this.addLines = function(lines)
    {
        for(var i in range(0, lines - 1, 1))
        {
            this.addLine();
        }
        return this;
    };

    Layout.call(this);
    this.lines = 0;
    this.class = "TextEditLineNumbers";
    this.createElement('div');
    this.addLines(lines);
    this.setStyles(DEFAULT_STYLE.TextEditLineNumbers);
    return this;
}

/**
 *
 * @param text
 * @constructor
 */
function TextEditTextArea(text)
{
    Widget.call(this);
    this.class = "TextEditTextArea";
    this.createElement("div");
    this.setAttribute("contenteditable", "true");
    this.setStyles(DEFAULT_STYLE.TextEditTextArea);
    return this;
}

/**
 *
 * @param text
 * @constructor
 */
function TextEdit(text)
{
    //var r = window.getSelection().getRangeAt(0);
    this.onKeyDown = function(event)
    {
        var key = event.keyCode ? event.keyCode : event.which;
        var w;
        if(key === 13) // Newline
        {
            w = getWidget(this.id);
            w.parent.line_area.addLine();
        }
        else if(key === 8 || key === 46) // Delete / Erase
        {
            w = getWidget(this.id);
            var lines = w.element.innerText.split(/\r|\r\n|\n/).length;
            while(w.parent.line_area.lines > lines)
            {
                w.parent.line_area.removeLine();
            }
        }
    };

    Layout.call(this);
    this.class = "TextEdit";
    this.line_area = new TextEditLineNumbers(1);
    this.text_area = new TextEditTextArea();
    this.text_area.element.onkeydown = this.onKeyDown;
    this.createElement("div");
    this.append([this.line_area, this.text_area]);
    this.setStyles(DEFAULT_STYLE.TextEdit);
    return this;
}

function CollapseWidget(text)
{
    Layout.call(this);
    this.class = "CollapseWidget";
    this.status = "open";
    this.text_content = new Text(text).setStyles(
    {
        margin: "20px 5px 5px 5px",
        padding: "5px 50px 5px 50px"
    });
    this.collapse_button = new Button("-").setStyles(
    {
        display: "block",
        right: "0px"
    });
    this.collapse_button.element.onclick = function()
    {
        var w = getWidget(this.id);
        if(w.parent.status === "open")
        {
             w.parent.text_content.hide();
             w.parent.status = "closed";
        }
        else
        {
            w.parent.text_content.show(true);
            w.parent.status = "open";
        }
    };
    this.createElement("div");
    this.append([this.collapse_button, this.text_content]);
    this.setStyles(DEFAULT_STYLE.CollapseWidget);
    return this;
}

/**
 *
 * @param value
 * @returns {TableWidgetCell}
 * @constructor
 */
function TableWidgetCell(value)
{
    Widget.call(this);
    this.class = "TableWidgetCell";
    this.createElement("td");
    this.setText(init(value, ""));
    this.setStyles(DEFAULT_STYLE.TableWidgetCell);
    return this;
}

/**
 *
 * @returns {TableWidgetHeader}
 * @constructor
 */
function TableWidgetHeader(value)
{
    Widget.call(this);
    this.class = "TableWidgetHeader";
    this.createElement("th");
    this.setText(init(value, ""));
    this.setStyles(DEFAULT_STYLE.TableWidgetHeader);
    return this;
}

/**
 *
 * @param entries
 * @returns {TableWidgetRow}
 * @constructor
 */
function TableWidgetRow(entries)
{
    this.setEntry = function(entry, index)
    {
        return this;
    };

    this.setEntries = function(entries, index)
    {
        return this;
    };

    this.addEntry = function(entry)
    {
        if(entry instanceof TableWidgetCell)
        {
            this.append(entry);
        }
        else
        {
            this.append(new TableWidgetCell(entry));
        }
        return this;
    };

    this.addEntries = function(entries)
    {
        for(var entry in entries)
        {
            this.addEntry(entries[entry]);
        }
        return this;
    };

    Layout.call(this);
    this.class = "TableWidgetRow";
    this.createElement("tr");
    this.addEntries(init(entries, []));
    this.setStyles(DEFAULT_STYLE.TableWidgetRow);
    return this;
}

/**
 *
 * @param entries
 * @returns {TableWidgetHeaderRow}
 * @constructor
 */
function TableWidgetHeaderRow(entries)
{
    this.setEntry = function(entry, index)
    {
        return this;
    };

    this.setEntries = function(entries, index)
    {
        return this;
    };

    this.addEntry = function(entry)
    {
        if(entry instanceof TableWidgetHeader)
        {
            this.append(entry);
        }
        else
        {
            this.append(new TableWidgetHeader(entry));
        }
        return this;
    };

    this.addEntries = function(entries)
    {
        for(var entry in entries)
        {
            this.addEntry(entries[entry]);
        }
        return this;
    };

    Layout.call(this);
    this.class = "TableWidgetHeaderRow";
    this.createElement("tr");
    this.addEntries(init(entries, []));
    this.setStyles(DEFAULT_STYLE.TableWidgetHeaderRow);
    return this;
}

/**
 *
 * @param entries
 * @returns {TableWidgetHead}
 * @constructor
 */
function TableWidgetHead(entries)
{
    this.setHeader = function(row, index)
    {
        return this;
    };

    this.setHeaders = function(rows, index)
    {
        return this;
    };

    this.addHeader = function(entry)
    {
        this.row.addEntry(entry);
        return this;
    };

    this.addHeaders = function(entries)
    {
        this.row.addEntries(entries);
        return this;
    };

    Layout.call(this);
    this.class = "TableWidgetHead";
    this.row = new TableWidgetHeaderRow(entries);
    this.createElement("thead");
    this.append(this.row);
    this.setStyles(DEFAULT_STYLE.TableWidgetHead);
    return this;
}

/**
 *
 * @param rows
 * @returns {TableWidgetBody}
 * @constructor
 */
function TableWidgetBody(rows)
{
    this.setRow = function(row, index)
    {
        return this;
    };

    this.setRows = function(rows, index)
    {
        return this;
    };

    this.addRow = function(row)
    {
        if(row instanceof TableWidgetRow)
        {
            this.append(row);
        }
        else
        {
            this.append(new TableWidgetRow(row));
        }
        return this;
    };

    this.addRows = function(rows)
    {
        for(var row in rows)
        {
            this.addRow(rows[row]);
        }
        return this;
    };

    Layout.call(this);
    this.class = "TableWidgetBody";
    this.createElement("tbody");
    this.addRows(init(rows, []));
    this.setStyles(DEFAULT_STYLE.TableWidgetBody);
    return this;
}

/**
 *
 * @param rows
 * @param headers
 * @returns {TableWidget}
 * @constructor
 */
function TableWidget(rows, headers)
{
    this.setHeader = function(header, index)
    {
        this.table_header.setHeader(header, index);
        return this;
    };

    this.setHeaders = function(headers, index)
    {
        this.table_header.setHeaders(headers, index);
        return this;
    };

    this.addHeader = function(header)
    {
        this.table_header.addHeader(header);
        return this;
    };

    this.addHeaders = function(headers)
    {
        this.table_header.addHeaders(headers);
        return this;
    };

    this.setRow = function(row, index)
    {
        this.table_body.setRow(row, index);
        return this;
    };

    this.setRows = function(rows, index)
    {
        this.table_body.setRows(rows, index);
        return this;
    };

    this.addRow = function(row)
    {
        this.table_body.addRow(row);
        return this;
    };

    this.addRows = function(rows)
    {
        this.table_body.addRows(rows);
        return this;
    };

    Layout.call(this);
    this.class = "TableWidget";
    if(init(headers, true))
    {
        this.table_header = new TableWidgetHead(rows[0]);
        rows.splice(0, 1);
        this.table_body = new TableWidgetBody(rows);
    }
    else
    {
        this.table_header = new TableWidgetHead();
        this.table_body = new TableWidgetBody(rows);
    }
    this.createElement("table");
    this.append([this.table_header, this.table_body]);
    this.setStyles(DEFAULT_STYLE.TableWidget);
    return this;
}

/**
 *
 * @param value
 * @returns {ListWidgetEntry}
 * @constructor
 */
function ListWidgetEntry(value)
{
    Widget.call(this);
    this.class = "ListWidgetEntry";
    this.createElement("li");
    this.setText(init(value, ""));
    this.setStyles(DEFAULT_STYLE.ListWidgetEntry);
    return this;
}

/**
 *
 * @param entries
 * @param type
 * @returns {ListWidget}
 * @constructor
 */
function ListWidget(entries, type)
{
    this.addEntry = function(entry)
    {
        if(entry instanceof ListWidgetEntry)
        {
            this.append(entry);
        }
        else
        {
            this.append(new ListWidgetEntry(entry));
        }
        return this;
    };

    this.addEntries = function(entries)
    {
        for(var entry in entries)
        {
            this.addEntry(entries[entry]);
        }
        return this;
    };

    Layout.call(this);
    type = (type === "ol") ? "ol" : "ul";
    this.class = "ListWidget";
    this.createElement(type);
    this.addEntries(init(entries, []));
    this.setStyles(DEFAULT_STYLE.ListWidget);
    return this;
}

/**
 *
 * @param text
 * @param content
 * @returns {TabWidgetTab}
 * @constructor
 */
function TabWidgetTab(text, content)
{
    Widget.call(this);
    this.class = "TabWidgetTab";
    this.content = content;
    this.createElement("div");
    this.element.onclick = function()
    {
        var w = getWidget(this.id);
        w.parent.parent.setContent(content);
        //w.parent.parent.children.append(w.parent.parent.tab_header.tab[text]);

    };
    this.setText(text);
    this.setStyles(DEFAULT_STYLE.TabWidgetTab);
    return this;
}

/**
 *
 * @param tabs
 * @param contents
 * @returns {TabWidgetHeader}
 * @constructor
 */
function TabWidgetHeader(tabs, contents)
{
    this.addTab = function(tab, content)
    {
        if(tab instanceof TabWidgetTab)
        {
            this.append(tab);
            this.tabs.push(tab);
        }
        else
        {
            var tab_widget = new TabWidgetTab(tab, content);
            this.append(tab_widget);
            this.tabs.push(tab_widget);
        }
        return this;
    };

    this.addTabs = function(tabs, contents)
    {
        for(var tab in tabs)
        {
            this.addTab(tabs[tab], contents[tab]);
        }
        return this;
    };

    Layout.call(this);
    this.class = "TabWidgetHeader";
    this.tabs = [];
    this.createElement("div");
    this.addTabs(init(tabs, [""]), init(contents, [""]));
    this.setStyles(DEFAULT_STYLE.TabWidgetHeader);
    return this;
}

/**
 *
 * @param content
 * @returns {TabWidgetContent}
 * @constructor
 */
function TabWidgetContent(content)
{
    this.setContent = function(content)
    {
        if(typeof content === "object")
        {
            this.setChild(content);
        }
        else
        {
            this.element.innerHTML = content;
        }
        return this;
    };

    Widget.call(this);
    this.class = "TabWidgetContent";
    this.createElement("div");
    this.setContent(init(content, ""));
    this.setStyles(DEFAULT_STYLE.TabWidgetContent);
    return this;
}

/**
 *
 * @param headers
 * @param contents
 * @returns {TabWidget}
 * @constructor
 */
function TabWidget(headers, contents)
{
    this.setTab = function(tab, content)
    {
        return this;
    };

    this.setTabs = function(tabs, contents)
    {
        return this;
    };

    this.setContent = function(content)
    {
        this.content.setContent(content);
        return this;
    };

    this.addTab = function(tab, content)
    {
        this.tab_header.addTab(tab, content);
        return this;
    };

    this.addTabs = function(tabs, contents)
    {
        for(var tab in tabs)
        {
            this.addTab(tabs[tab], contents[tab]);
        }
        return this;
    };

    Layout.call(this);
    this.class = "TabWidget";
    this.tab_header = new TabWidgetHeader(init(headers, ["new*"]), init(contents, ["empty"]));
    this.content = new TabWidgetContent(this.tab_header.tabs[0].content);
    this.createElement("div");
    this.append([this.tab_header, this.content]);
    this.setStyles(DEFAULT_STYLE.TabWidget);
    return this;
}