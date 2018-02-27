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
    this.append = function(element)
    {
        document.body.appendChild(element);
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
        this.element.innerHTML = object;
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
function TableWidgetRow()
{
    Layout.call(this);
    this.element = document.createElement('tr');
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
        this.element.innerHTML = "<tr><td>asd</td></tr>";
    };

    this.addColumns = function(headers, entries)
    {

    };

    this.addRow = function(row, index)
    {

    };

    this.addRows = function(rows)
    {

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
 * @param list
 * @param type
 * @returns {ListWidget}
 * @constructor
 */
function ListWidget(list, type)
{
    Layout.call(this);
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
    Layout.call(this);
    return this;
}