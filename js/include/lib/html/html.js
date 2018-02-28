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
    return obj === 'undefined';
}

function init(obj, def)
{
    if(empty(obj))
        return def;
    else
        return obj;
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
            if(this.element.hasOwnProperty(style))
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
    };

    this.getObject = function()
    {
        return this.element;
    };

    this.element = document.createElement('div');
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
 * @returns {TableWidgetRow}
 * @constructor
 */
function TableWidgetRow(entries)
{
    this.addEntry = function(entry)
    {
        if(entry instanceof TableWidgetHeader || entry instanceof TableWidgetCell)
        {
            this.appendChild(entry);
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
    this.element = document.createElement('tr');
    this.addEntries(init(entries, {}));
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
    this.element = document.createElement('th');
    this.setValue(init(value, ""));
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
    this.element = document.createElement('td');
    this.setValue(init(value, ""));
    return this;
}

/**
 *
 * @param headers
 * @param entries
 * @returns {TableWidget}
 * @constructor
 */
function TableWidget(headers, entries)
{
    this.addColumn = function(header, index, entries)
    {
        if(init(index, -1) >= -1)
        {
            this.headers.splice(index, 0, header);
        }
        else
        {
            this.headers.splice(this.headers.length, 0, header);
        }
        this.appendChild(new TableWidgetHeader(header).add(new TableWidgetCell(entries[0])));
        return this;
    };

    this.addColumns = function(headers, entries)
    {
        this.add(new TableWidgetRow(headers[0]).add(new TableWidgetCell(entries[0])));
        return this;
    };

    this.addRow = function(row, index)
    {
        if(row instanceof TableWidgetRow)
        {
            this.add(row);
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
    this.element = document.createElement('table');
    this.headers = [];
    this.entries = [];
    this.addColumns(init(headers, {}));
    this.addRows(init(entries, {}));
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
    Object.call(this);
    this.element = document.createElement('li');
    this.setValue(init(value, ""));
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
    };

    this.addEntries = function(entries)
    {
        for(var entry in entries)
        {
            this.addEntry(entries[entry]);
        }
    };

    Layout.call(this);
    type = (type === 'ul') ? 'ul' : 'ol';
    this.element = document.createElement(type);
    this.addEntries(init(entries, {}));
    return this;
}

/**
 *
 * @param headers
 * @param entries
 * @returns {TabWidget}
 * @constructor
 */
function TabWidget(headers, entries)
{
    this.addTab = function(tab, entry)
    {
        // change from tab to tab.name
          this.contents[tab] = init(entry, {});
    };

    this.addTabs = function(tabs, entries)
    {
        for(var i = 0; i < Math.max(tabs.length, entries); ++i)
        {
            this.addTab(init(tabs[i], ""), init(entries[i], ""));
        }
    };

    this.setTabContent = function(tab, content)
    {
        this.contents[tab] = content;
    };

    Layout.call(this);
    this.element = document.createElement('div');
    this.headers = document.createElement('div');
    this.contents = {};
    this.addTabs(headers, entries);
    return this;
}