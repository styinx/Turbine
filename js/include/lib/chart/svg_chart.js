Array.prototype.max = function()
{
    return Math.max.apply(null, this);
};

Array.prototype.min = function()
{
    return Math.min.apply(null, this);
};

var COLOR =
{
    TRANSPARENT : "rgba(0, 0, 0, 0)",
    BLACK : "rgba(0, 0, 0, 255)",
    WHITE : "rgba(255, 255, 255, 255)"
};

var SVG =
{
    /*
     * Represents a svg element.
     */
    Object : function(type)
    {
        this.get = function()
        {
            return this.element;
        };

        this.setEvent = function(event, callback)
        {
            this.element.event = callback;
            return this;
        };

        this.setStyle = function(key, value)
        {
            this.element.style.key = value;
            return this;
        };

        this.setStyles = function(styles)
        {
            for(var key in styles)
            {
                this.setStyle(key, styles[key]);
            }
            return this;
        };

        this.element = document.createElementNS("http://www.w3.org/2000/svg", type);

        return this;
    },

    Group : function()
    {
        this.setEvent = function(event, callback)
        {
            for(var element in this.element.children)
            {
                this.element.children[element].addEventListener(event, callback);
            }
        };

        SVG.Object.call(this, "g");

        this.element.id = "a";

        return this;
    },

    Text : function(text, x, y)
    {
        SVG.Object.call(this, "text");

        this.element.setAttribute("x", x);
        this.element.setAttribute("y", y);

        return this;
    },

    Point : function(x, y, size)
    {
        SVG.Object.call(this, "circle");

        var r = (size / 2 ).toString();

        this.element.setAttribute("cx", x);
        this.element.setAttribute("cy", y);
        this.element.setAttribute("r", r);

        return this;
    },

    Line : function(x1, y1, x2, y2)
    {
        SVG.Object.call(this, "line");

        this.element.id = "a";
        this.element.setAttribute("x1", x1);
        this.element.setAttribute("y1", y1);
        this.element.setAttribute("x2", x2);
        this.element.setAttribute("y2", y2);

        return this;
    },

    Rect : function(x, y, w, h)
    {
        SVG.Object.call(this, "rect");

        this.element.setAttribute("x", x);
        this.element.setAttribute("y", y);
        this.element.setAttribute("width", w);
        this.element.setAttribute("height", h);

        return this;
    },

    Circle : function(x, y, size)
    {
        SVG.Object.call(this, "circle");

        this.element.setAttribute("cx", x);
        this.element.setAttribute("cy", y);
        this.element.setAttribute("r", size);

        return this;
    },

    Ellipse : function(cx, cy, rx, ry)
    {
        SVG.Object.call(this, "ellipse");

        this.element.setAttribute("cx", cx);
        this.element.setAttribute("cy", cy);
        this.element.setAttribute("rx", rx);
        this.element.setAttribute("ry", ry);

        return this;
    },

    Path : function(path)
    {
        SVG.Object.call(this, "path");

        this.element.setAttribute("d", path);

        return this;
    },

    Renderer : function(chart)
    {
        this.append = function(element)
        {
            this.head.appendChild(element);

            return this;
        };

        this.up = function()
        {
            if(this.head.parent)
            {
                this.head = this.head.parent;
            }
            return this;
        };

        this.top = function()
        {
            return this.head;
        };

        this.down = function(group)
        {
            var new_head = SVG.Group().get();
            if(group !== null && group !== undefined)
            {
                new_head = group;
            }
            this.head.child = new_head;
            new_head.parent = this.head;
            this.append(new_head);
            this.head = new_head;
            return this;
        };
        
        this.setDrawColor = function(color)
        {
            this.draw_color = color;
            return this;
        };

        this.setFillColor = function(color)
        {
            this.fill_color = color;
            return this;
        };

        this.setLineWidth = function(width)
        {
            width = width.toString();
            this.line_width = width;
            return this;
        };

        this.setOpacity = function(opacity)
        {
            opacity = opacity.toString();
            this.opacity = opacity;
            return this;
        };

        this.setFontFamily = function(family)
        {
            this.font_family = family;
            return this;
        };

        this.setFontSize = function(size)
        {
            size = size.toString();
            this.font_size = size;
            return this;
        };

        this.setFontSizeUnit = function(unit)
        {
            this.font_size_unit = unit;
            return this;
        };

        this.setTextAlignment = function(alignment)
        {
            this.text_alignment = alignment;
            return this;
        };

        this.setTextBaseline = function(baseline)
        {
            this.text_baseline = baseline;
            return this;
        };

        this.drawText = function(text, x, y)
        {
            var el = SVG.Text(text, x, y).get();

            el.style.stroke = this.text_color_fg;
            el.style.fill = this.text_color_bg;

            this.append(el);

            return this;
        };

        this.drawPoint = function(x, y, size)
        {
            var el = SVG.Point(x, y, size).get();

            el.style.stroke = this.draw_color;

            this.append(el);

            return this;
        };

        this.drawLine = function(x1, y1, x2, y2)
        {
            var el = SVG.Line(x1, y1, x2, y2).get();

            el.style.stroke = this.draw_color;
            el.style.strokeWidth = this.line_width;

            this.append(el);

            return this;
        };

        this.drawRect = function(x, y, w, h, filled)
        {
            var el = SVG.Rect(x, y, w, h, filled).get();

            el.style.stroke = this.draw_color;
            el.style.strokeWidth = this.line_width;
            el.style.fill = filled ? this.fill_color : COLOR.TRANSPARENT;

            this.append(el);

            return this;
        };

        this.drawCircle = function(x, y, r, filled)
        {
            var el = SVG.Circle(x, y, r, filled).get();

            el.style.stroke = this.draw_color;
            el.style.strokeWidth = this.line_width;
            el.style.fill = filled ? this.fill_color : COLOR.TRANSPARENT;

            this.append(el);

            return this;
        };

        this.drawEllipse = function(cx, cy, rx, ry, filled)
        {
            var el = SVG.Ellipse(cx, cy, rx, ry, filled).get();

            el.style.stroke = this.draw_color;
            el.style.strokeWidth = this.line_width;
            el.style.fill = filled ? this.fill_color : COLOR.TRANSPARENT;

            this.append(el);

            return this;
        };

        this.drawPath = function(p, filled)
        {
            var el = SVG.Path(p, filled).get();

            this.append(el);

            return this;
        };

        this.chart = chart;
        this.head = this.chart.svg;

        this.draw_opacity = "1.0";
        this.draw_color = COLOR.BLACK;
        this.fill_color = COLOR.WHITE;
        this.text_color_fg = COLOR.BLACK;
        this.text_color_bg = COLOR.TRANSPARENT;
        this.line_width = "1";
        this.font_family = "Arial";
        this.font_size = "18";
        this.font_size_unit = "pt";
        this.text_alignment = "left";
        this.text_baseline = "alphabetic";

        return this;
    }
};

function Chart()
{
    this.attach = function(element)
    {
        var container = null;
        if(typeof element === "string")
        {
            container = document.getElementById(element);
        }
        else
        {
            container = element;
        }
        container.appendChild(this.svg);

        this.svg.setAttribute("width", container.clientWidth);
        this.svg.setAttribute("height", container.clientHeight);
        this.w = this.svg.width.animVal.value;
        this.h = this.svg.height.animVal.value;

        return this;
    };

    this.getRenderer = function()
    {
        return this.renderer;
    };

    this.setMinorGrid = function(width, height, x_size, y_size, color)
    {
        this.minor_grid = [width, height, x_size, y_size, color];
        return this;
    };

    this.setMajorGrid = function(width, height, x_size, y_size, color)
    {
        this.major_grid = [width, height, x_size, y_size, color];
        return this;
    };

    this.drawGrid = function()
    {
        var color = this.draw_color;
        var width = this.line_width;

        this.renderer.draw_color = this.minor_grid[4];
        this.renderer.line_width = this.minor_grid[2];

        var x;
        var y;

        this.renderer.down();

        for(x = 0; x < this.w; x += this.minor_grid[0])
        {
            this.renderer.drawLine(x, 0, x, this.h);
        }

        this.renderer.line_width = this.minor_grid[3];
        for(y = this.h; y > 0; y -= this.minor_grid[1])
        {
            this.renderer.drawLine(0, y, this.w, y);
        }

        this.draw_color = this.major_grid[4];
        this.renderer.line_width = this.major_grid[2];
        for(x = 0; x < this.w; x += this.major_grid[0])
        {
            this.renderer.drawLine(x, 0, x, this.h);
        }

        this.renderer.line_width = this.major_grid[3];
        for(y = this.h; y > 0; y -= this.major_grid[1])
        {
            this.renderer.drawLine(0, y, this.w, y);
        }

        this.renderer.up();

        this.renderer.line_width = width;
        this.renderer.draw_color = color;

        return this;
    };

    this.svg = SVG.Object("svg").get();
    this.renderer = SVG.Renderer(this);

    this.minor_grid = [50, 50, 1, 1, "rgba(30, 30, 30, 55)"];
    this.major_grid = [125, 125, 2, 2, "rgba(40, 40, 40, 55)"];

    return this;
}

function LineChart(w, h)
{
    this.draw = function(data)
    {
        var chart_width = this.w;
        var chart_height = this.h;
        var height_min = data.min();
        var height_max = data.max();
        var height_factor = chart_height / height_max;
        var step_x = chart_width / data.length;
        var start_x = step_x / 2;

        if(data instanceof Array)
        {
            var x = start_x;
            var point_x = x;
            var point_y = chart_height + (height_factor / 2) - data[0] * height_factor;

            this.renderer.setLineWidth(2);
            this.renderer.setDrawColor(COLOR.WHITE);

            var group = SVG.Group();

            this.renderer.down(group.get());

            for(var index = 1; index < data.length;)
            {
                x += step_x;
                this.renderer.drawLine(point_x, point_y, x, chart_height + (height_factor / 2) - data[index] * height_factor);
                point_x = x;
                point_y = chart_height + (height_factor / 2) - data[index] * height_factor;
                index++;
            }

            this.renderer.up();
        }
        return this;
    };

    Chart.call(this, w, h);

    return this;
}