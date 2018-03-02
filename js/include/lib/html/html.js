var STYLE =
    {
        Button:
        {
            background:   "#CCCCCC",
            border:       "1px solid #555555",
            borderRadius: "2px",
            fontSize:     "11pt",
            margin:       "3px 3px 3px 3px",
            minWidth:     "60px",
            outline:      "0",
            padding:      "2px 5px 2px 5px"
        },
        Text:
        {
            padding: "2px 5px 2px 5px"
        },
        TextInputWidget:
        {
            background:   "#DDDDDD",
            border:       "none",
            borderBottom: "1px solid #555555",
            fontSize:     "11pt",
            margin:       "-1px 0",
            outline:      "0",
            padding:      "3px 5px 2px 5px"
        },
        TableWidget:
        {
            border:         "none",
            borderCollapse: "collapse",
            borderStyle:    "hidden",
            margin:         "5px 0px 5px 0px"
        },
        TableWidgetHead:
        {
            background: "#BBBBBB"
        },
        TableWidgetBody:
        {
            background: "#DDDDDD"
        },
        TableWidgetHeaderRow:
        {
            borderBottom: "1px solid #222222"
        },
        TableWidgetHeader:
        {
            minWidth: "100px",
            padding:  "2px 2px 2px 2px"
        },
        TableWidgetRow:
        {
            borderBottom: "1px solid #999999"
        },
        TableWidgetCell:
        {
            borderRight: "1px solid #AAAAAA",
            padding:     "2px 5px 2px 5px",
            textAlign:   "left"
        },
        ListWidget:
        {
            background:   "#CCCCCC",
            border:       "1px solid #555555",
            borderRadius: "5px"
        },
        ListWidgetEntry:
        {
            padding: "2px 5px 2px 15px"
        },
        TabWidget:
        {
            minWidth:  "300px"
        },
        TabWidgetHeader:
        {
            height:    "20px",
            margin:    "0 10px 0 10px",
            maxHeight: "20px",
            minWidth:  "400px",
            whiteSpace: "nowrap"
        },
        TabWidgetTab:
        {
            background:   "linear-gradient(#DDDDDD, #AAAAAA)",
            border:       "1px solid #333333",
            borderRadius: "3px",
            cursor:       "pointer",
            display:      "inline-block",
            float:        "left",
            fontFamily:   "Verdana, Arial, sans-serif",
            fontWeight:   "bold",
            height: "100%",
            padding:      "3px",
            textAlign:    "center",
            width:        "150px"
        },
        TabWidgetContent:
        {
            background: "#EEEEEE",
            border:     "1px solid #333333",
            height:     "200px",
            padding:    "10px 0",
            textAlign:  "left",
            width:      "100%"
        }
    };

function range(from, to, step)
{
    var l = [];
    for(var i = from; i <= to; i += step)
    {
        l.push(i);
    }
    return l;
}

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
}

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
        this.children.push(object);
        document.body.appendChild(object.element);
        return this;
    };

    return this;
}

/**
 *
 * @returns {Object}
 * @constructor
 */
function Object()
{
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
        return this;
    };

    this.setText = function(text)
    {
        this.element.innerHTML = text;
        return this;
    };

    this.setValue = function(value)
    {
        this.element.value = value;
        return this;
    };

    this.getObject = function()
    {
        return this.element;
    };

    this.element = document.createElement("div");
    this.class = "Object";
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
    this.element = document.createElement("p");
    this.class = "Text";
    this.setText(text);
    this.setStyles(STYLE.Text);
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
    this.element = document.createElement("button");
    this.class = "Button";
    this.setText(text);
    this.setStyles(STYLE.Button);
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
    this.element = document.createElement("input");
    this.class = "TextInputWidget";
    this.setValue(text);
    this.setStyles(STYLE.TextInputWidget);
    this.setAttribute("type", "text");
    this.setAttribute("placeholder", placeholder);
    return this;
}

/**
 *
 * @constructor
 */
function Layout()
{
    this.appendChild = function(child)
    {
        this.children.push(child);
        this.element.appendChild(child.element);
        return this;
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
 * @param value
 * @returns {TableWidgetCell}
 * @constructor
 */
function TableWidgetCell(value)
{
    Widget.call(this);
    this.element = document.createElement("td");
    this.class = "TableWidgetCell";
    this.setText(init(value, ""));
    this.setStyles(STYLE.TableWidgetCell);
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
    this.element = document.createElement("th");
    this.class = "TableWidgetHeader";
    this.setText(init(value, ""));
    this.setStyles(STYLE.TableWidgetHeader);
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
            this.appendChild(entry);
        }
        else
        {
            this.appendChild(new TableWidgetCell(entry));
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
    this.element = document.createElement("tr");
    this.class = "TableWidgetRow";
    this.addEntries(init(entries, []));
    this.setStyles(STYLE.TableWidgetRow);
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
            this.appendChild(entry);
        }
        else
        {
            this.appendChild(new TableWidgetHeader(entry));
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
    this.element = document.createElement("tr");
    this.class = "TableWidgetHeaderRow";
    this.addEntries(init(entries, []));
    this.setStyles(STYLE.TableWidgetHeaderRow);
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
    this.element = document.createElement("thead");
    this.class = "TableWidgetHead";
    this.row = new TableWidgetHeaderRow(entries);
    this.appendChild(this.row);
    this.setStyles(STYLE.TableWidgetHead);
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
            this.appendChild(row);
        }
        else
        {
            this.appendChild(new TableWidgetRow(row));
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
    this.element = document.createElement("tbody");
    this.class = "TableWidgetBody";
    this.addRows(init(rows, []));
    this.setStyles(STYLE.TableWidgetBody);
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
    this.element = document.createElement("table");
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
    this.appendChild(this.table_header);
    this.appendChild(this.table_body);
    this.setStyles(STYLE.TableWidget);
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
    this.element = document.createElement("li");
    this.class = "ListWidgetEntry";
    this.setText(init(value, ""));
    this.setStyles(STYLE.ListWidgetEntry);
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
            this.appendChild(entry);
        }
        else
        {
            this.appendChild(new ListWidgetEntry(entry));
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
    this.element = document.createElement(type);
    this.class = "ListWidget";
    this.addEntries(init(entries, []));
    this.setStyles(STYLE.ListWidget);
    return this;
}

/**
 *
 * @param parent
 * @param text
 * @param content
 * @returns {TabWidgetTab}
 * @constructor
 */
function TabWidgetTab(parent, text, content)
{
    Widget.call(this);
    this.element = document.createElement("div");
    this.class = "TabWidgetTab";
    this.parent = parent;
    this.content = content;
    this.element.onclick = function()
    {
        parent.setContent(content)
    };
    this.setText(text);
    this.setStyles(STYLE.TabWidgetTab);
    return this;
}

/**
 *
 * @param parent
 * @param tabs
 * @param contents
 * @returns {TabWidgetHeader}
 * @constructor
 */
function TabWidgetHeader(parent, tabs, contents)
{
    this.addTab = function(tab, content)
    {
        if(tab instanceof TabWidgetTab)
        {
            this.appendChild(tab);
            this.tabs.push(tab);
        }
        else
        {
            var tab_widget = new TabWidgetTab(this.parent, tab, content);
            this.appendChild(tab_widget);
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
    this.element = document.createElement("div");
    this.class = "TabWidgetHeader";
    this.parent = parent;
    this.tabs = [];
    this.addTabs(init(tabs, [""]), init(contents, [""]));
    this.setStyles(STYLE.TabWidgetHeader);
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
    this.element = document.createElement("div");
    this.class = "TabWidgetContent";
    this.setContent(init(content, ""));
    this.setStyles(STYLE.TabWidgetContent);
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
        this.tabs.addTab(tab, content);
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
    this.element = document.createElement("div");
    this.class = "TabWidget";
    this.tabs = new TabWidgetHeader(this, init(headers, [""]), init(contents, [""]));
    this.content = new TabWidgetContent(this.tabs.tabs[0].content);
    this.appendChild(this.tabs);
    this.appendChild(this.content);
    this.setStyles(STYLE.TabWidget);
    return this;
}