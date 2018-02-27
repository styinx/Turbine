function Document()
{
    this.append = function(element)
    {
        document.body.appendChild(element);
    };

    return this;
}

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

/**
 *
 * @param tag
 * @param text
 * @param attributes
 * @param style
 * @returns {Entity}
 * @constructor
 */
function Object(tag, text, attributes, style)
{
    this.element = document.createElement(tag);
    this.children = [];
    this.element.innerHTML = text || "";

    this.add = function(el)
    {
        if(el instanceof Array)
        {
            for(var e in el)
            {
                this.children.push(el[e]);
                this.element.appendChild(el[e].element);
            }
        }
        else
        {
            this.children.push(el);
            this.element.appendChild(el.element);
        }
        return this;
    };

    this.setAttributes = function(attributes)
    {
        for(var attr in attributes)
        {
            this.element.setAttribute(attr, attributes[attr])
        }
    };

    this.setStyle = function(style)
    {
        for(var st in style)
        {
            if(this.element.style.hasOwnProperty(st))
            {
                this.element.style[st] = style[st];
            }
        }
        return this;
    };

    this.getEntity = function()
    {
        return this.element;
    };

    this.setAttributes(attributes);
    this.setStyle(style);

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
    this.table_widget = new Object('table');
    this.headers = [];
    this.entries = [];
    this.rows = entries.length;
    this.cols = Math.max(headers.length, entries[0].length);

    this.addHeaders = function(headers)
    {
        this.table_widget.add(new Object('tr').add(headers));
    };

    this.addRow = function(entries)
    {
        this.table_widget.add(new Object('tr').add(entries));
    };

    this.addRows = function(rows)
    {
        for(var index in rows)
        {
            this.addRow(rows[index]);
        }
    };

    this.setStyle = function(style, selector)
    {
        for(var index = 0; index <= this.cols; ++index)
        {
            if(selector.indexOf(index) > -1)
            {
                this.table_widget.children[index].setStyle(style);
            }
        }
        return this;
    };

    this.getTableWidget = function()
    {
        return this.table_widget;
    };

    for(var header in headers)
    {
        this.headers.push(new Object('th', headers[header]));
    }

    for(var index = 0; index < this.rows; ++index)
    {
        var row = [];
        for(var col in entries[index])
        {
            row.push(new Object('td', entries[index][col]));
        }
        this.entries.push(row);
    }

    this.addHeaders(this.headers);
    this.addRows(this.entries);

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
    this.type = (type === "ul" || type === "ol") ? type : "ul";
    this.list_widget = new Object(this.type);
    this.entries = 0;

    this.addEntry = function(text)
    {
        if(typeof text === 'string')
        {
            this.list_widget.add(new Object('li', text));
            this.entries += 1;
        }
        return this;
    };

    this.addEntries = function(entries)
    {
        if(entries instanceof Array)
        {
            for(var entry in entries)
            {
                this.addEntry(entries[entry]);
            }
        }
        else
        {
            this.addEntry(entries);
        }
        return this;
    };

    this.addListWidget = function(list)
    {
        if(list instanceof ListWidget)
        {
            this.list_widget.add(list.getListWidget());
        }
        return this;
    };

    this.setStyle = function(style, selector)
    {
        for(var index = 0; index < this.getListWidget().getEntity().children.length; ++index)
        {
            if(selector.indexOf(index) > -1)
            {
                this.list_widget.children[index].setStyle(style);
            }
        }
        return this;
    };

    this.getListWidget = function ()
    {
        return this.list_widget;
    };

    this.addEntries(list);

    return this;
}

function TabWidget(headers, entries)
{
    this.tab_widget = new Object('div');
    this.tabs = {};
    this.headers = headers || [];
    this.entries = entries || [];

    this.addTab = function(name, content)
    {
        this.tabs[name] = new Object('div', name);
        var tab = this.tabs[name];
        tab.add(content).setStyle({"display" : "inline", "float" : "left"});
        this.tab_widget.add(tab);
        return this;
    };

    this.setTabContent = function(content)
    {

    };

    this.getTabWidget = function()
    {
        return this.tab_widget;
    };

    // for(var index = 0; index < headers.length; ++index)
    // {
    //     this.addTab(headers[index], entries[index]);
    // }

    this.tab_widget.setStyle(style.TabWidget);

    return this;
}