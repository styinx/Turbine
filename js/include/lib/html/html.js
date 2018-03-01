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
        return obj === "undefined" || obj.length === 0;
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

/**
 *
 * @returns {Document}
 * @constructor
 */
function Document()
{
    this.append = function(object)
    {
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
    this.setStyle = function(styles)
    {
        for(var style in styles)
        {
            if(this.element.style.hasOwnProperty(style))
            {
                this.element.style[style] = styles[style];
            }
        }
        return this;
    };

    this.setChild = function(object)
    {
        this.element.setChild(object.element);
        return this;
    };

    this.setValue = function(value)
    {
        this.element.innerHTML = value;
        return this;
    };

    this.getObject = function()
    {
        return this.element;
    };

    this.element = document.createElement("div");
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
        this.element.appendChild(child.element);
        return this;
    };
    Object.call(this);
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
    this.setValue(init(value, ""));
    this.setStyle(STYLE.TableWidgetCell);
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
    this.setValue(init(value, ""));
    this.setStyle(STYLE.TableWidgetHeader);
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
    this.addEntries(init(entries, []));
    this.setStyle(STYLE.TableWidgetRow);
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
    this.addEntries(init(entries, []));
    this.setStyle(STYLE.TableWidgetHeaderRow);
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
    this.row = new TableWidgetHeaderRow(entries);
    this.appendChild(this.row);
    this.setStyle(STYLE.TableWidgetHead);
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
    this.addRows(init(rows, []));
    this.setStyle(STYLE.TableWidgetBody);
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
    this.setStyle(STYLE.TableWidget);
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
    this.setValue(init(value, ""));
    this.setStyle(STYLE.ListWidgetEntry);
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
    this.addEntries(init(entries, []));
    this.setStyle(STYLE.ListWidget);
    return this;
}

/**
 *
 * @param parent
 * @param string
 * @returns {TabWidgetTab}
 * @constructor
 */
function TabWidgetTab(parent, string)
{
    Widget.call(this);
    this.element = document.createElement("div");
    this.parent = parent;
    this.setValue(string);
    this.element.onclick = this.parent.setContent(this.element.value);
    this.setStyle(STYLE.TabWidgetTab);
    return this;
}

/**
 *
 * @param parent
 * @param tabs
 * @returns {TabWidgetHeader}
 * @constructor
 */
function TabWidgetHeader(parent, tabs)
{
    this.addTab = function(tab)
    {
        if(tab instanceof TabWidgetTab)
        {
            this.appendChild(tab);
        }
        else
        {
            this.appendChild(new TabWidgetTab(this.parent, tab));
        }
        return this;
    };

    this.addTabs = function(tabs)
    {
        for(var tab in tabs)
        {
            this.addTab(tabs[tab]);
        }
        return this;
    };

    Layout.call(this);
    this.element = document.createElement("div");
    this.parent = parent;
    this.addTabs(init(tabs, []));
    this.setStyle(STYLE.TabWidgetHeader);
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
        if(content instanceof Object)
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
    this.setContent(init(content, ""));
    this.setStyle(STYLE.TabWidgetContent);
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
        this.tabs.addTab(tab);
        this.content.setContent(content);
        return this;
    };

    this.addTabs = function(tabs, contents)
    {
        for(var tab in tabs)
        {
            this.contents.push(contents[tab]);
            this.addTab(tabs[tab], contents[tab]);
        }
        return this;
    };

    Layout.call(this);
    this.element = document.createElement("div");
    this.tabs = new TabWidgetHeader(this, init(headers, [""]));
    this.contents = init(contents, [""]);
    this.content = new TabWidgetContent(this.contents[0]);
    this.appendChild(this.tabs);
    this.appendChild(this.content);
    return this;
}