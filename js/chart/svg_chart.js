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
    BLUE : "rgba(0, 0, 255, 255)",
    GREEN : "rgba(0, 255, 0, 255)",
    CYAN : "rgba(0, 255, 255, 255)",
    DARK_GRAY : "rgba(32, 32, 32, 32)",
    OLIVE : "rgba(96, 128, 0, 255)",
    GRAY : "rgba(128, 128, 128, 255)",
    PURPLE : "rgba(128, 128, 255, 255)",
    LIME : "rgba(128, 255, 128, 255)",
    LIGHT_BLUE : "rgba(128, 192, 255, 255)",
    ORANGE : "rgba(200, 128, 0, 255)",
    RED : "rgba(255, 0, 0, 255)",
    PINK : "rgba(255, 96, 128, 255)",
    MAGENTA : "rgba(255, 0, 255, 255)",
    YELLOW : "rgba(255, 255, 0, 255)",
    WHITE : "rgba(255, 255, 255, 255)"
};

var SERIES_COLORS =
[
    COLOR.LIGHT_BLUE,
    COLOR.ORANGE,
    COLOR.CYAN,
    COLOR.PINK,
    COLOR.YELLOW,
    COLOR.GREEN,
    COLOR.PURPLE,
    COLOR.GRAY,
    COLOR.LIME,
    COLOR.MAGENTA,
    COLOR.OLIVE
];

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

        this.setAttribute = function(key, value)
        {
            this.element.setAttribute(key, value);
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

        return this;
    },

    Text : function(text, x, y)
    {
        SVG.Object.call(this, "text");

        this.element.setAttribute("x", x);
        this.element.setAttribute("y", y);
        this.element.innerHTML = text;

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

    Polyline : function(points)
    {
        SVG.Object.call(this, "polyline");

        this.element.setAttribute("points", points);

        return this;
    },

    Polygon: function(points)
    {
        SVG.Object.call(this, "polygon");

        this.element.setAttribute("points", points);

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
        this.save = function()
        {
            for(var key in this)
            {
                this.state[key] = this[key];
            }
            return this;
        };

        this.restore = function()
        {
            for(var key in this)
            {
                this[key] = this.state[key];
            }
            return this;
        };

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

            el.setAttribute("stroke", this.text_color_fg);
            el.setAttribute("fill", this.text_color_bg);
            el.setAttribute("text-anchor", this.text_alignment);
            el.setAttribute("alignment-baseline", this.text_baseline);
            el.setAttribute("font-family", this.font_family);
            el.setAttribute("font-size", this.font_size + this.font_size_unit);

            this.append(el);

            return this;
        };

        this.drawPoint = function(x, y, size)
        {
            var el = SVG.Point(x, y, size).get();

            el.setAttribute("stroke", this.draw_color);

            this.append(el);

            return this;
        };

        this.drawLine = function(x1, y1, x2, y2)
        {
            var el = SVG.Line(x1, y1, x2, y2).get();

            el.setAttribute("stroke", this.draw_color);
            el.setAttribute("stroke-width", this.line_width);

            this.append(el);

            return this;
        };

        this.drawRect = function(x, y, w, h, filled)
        {
            var el = SVG.Rect(x, y, w, h, filled).get();

            el.setAttribute("stroke", this.draw_color);
            el.setAttribute("stroke-width", this.line_width);
            el.setAttribute("fill", filled ? this.fill_color : "none");

            this.append(el);

            return this;
        };

        this.drawCircle = function(x, y, r, filled)
        {
            var el = SVG.Circle(x, y, r, filled).get();

            el.setAttribute("stroke", this.draw_color);
            el.setAttribute("stroke-width", this.line_width);
            el.setAttribute("fill", filled ? this.fill_color : "none");

            this.append(el);

            return this;
        };

        this.drawEllipse = function(cx, cy, rx, ry, filled)
        {
            var el = SVG.Ellipse(cx, cy, rx, ry, filled).get();

            el.setAttribute("stroke", this.draw_color);
            el.setAttribute("stroke-width", this.line_width);
            el.setAttribute("fill", filled ? this.fill_color : "none");

            this.append(el);

            return this;
        };

        this.drawPolyline = function(points, filled)
        {
            var el = SVG.Polyline(points).get();

            el.setAttribute("stroke", this.draw_color);
            el.setAttribute("stroke-width", this.line_width);
            el.setAttribute("fill", filled ? this.fill_color : "none");

            this.append(el);

            return this;
        };

        this.drawPolygon = function(points)
        {
            var el = SVG.Path(points).get();

            el.setAttribute("stroke", this.draw_color);
            el.setAttribute("stroke-width", this.line_width);

            this.append(el);

            return this;
        };

        this.drawPath = function(p, filled)
        {
            var el = SVG.Path(p, filled).get();

            el.setAttribute("stroke", this.draw_color);
            el.setAttribute("stroke-width", this.line_width);

            this.append(el);

            return this;
        };

        this.chart = chart;
        this.head = this.chart.svg;
        this.state = {};

        this.draw_opacity = "1.0";
        this.draw_color = COLOR.BLACK;
        this.fill_color = COLOR.WHITE;
        this.text_color_fg = COLOR.DARK_GRAY;
        this.text_color_bg = COLOR.TRANSPARENT;
        this.line_width = "1";
        this.fill = false;
        this.font_family = "Roboto, sans-serif";
        this.font_size = "12";
        this.font_size_unit = "px";
        this.text_alignment = "middle";
        this.text_baseline = "middle";

        return this;
    }
};

function Chart(data)
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

        this.init(this.data);

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

    this.drawBackground = function()
    {
        this.renderer.save();

        this.renderer.draw_color = this.background.color;
        this.renderer.fill_color = this.background.color;
        this.renderer.drawRect(0, 0, this.w, this.h, true);

        this.renderer.restore();
        return this;
    };

    this.drawXAxis = function()
    {
        this.renderer.down(SVG.Group().setAttribute("class", "x-axis").get());

        this.renderer.save();
        this.renderer.draw_color = this.axis_lines.color;

        this.renderer.line_width = this.axis_lines.y_axis1;
        this.renderer.drawLine(0, this.h, this.w, this.h);

        this.renderer.line_width = this.axis_lines.y_axis2;
        this.renderer.drawLine(0, 0, this.w, 0);

        this.renderer.restore();

        this.renderer.up();

        return this;
    };

    this.drawYAxis = function()
    {
        this.renderer.down(SVG.Group().setAttribute("class", "y-axis").get());

        var color = this.draw_color;
        var width = this.line_width;
        this.renderer.draw_color = this.axis_lines.color;

        this.renderer.line_width = this.axis_lines.x_axis1;
        this.renderer.drawLine(0, 0, 0, this.h);

        this.renderer.line_width = this.axis_lines.x_axis2;
        this.renderer.drawLine(this.w, this.w, 0, this.h);

        this.renderer.draw_color = color;
        this.renderer.line_width = width;

        this.renderer.up();

        return this;
    };

    this.drawAxis = function()
    {
        this.renderer.down(SVG.Group().setAttribute("class", "axis").get());

        this.drawXAxis();
        this.drawYAxis();

        this.renderer.up();

        return this;
    };

    this.drawMinorXTicks = function()
    {
        this.renderer.down(SVG.Group().setAttribute("class", "minor-x-ticks").get());

        this.renderer.save();

        this.renderer.draw_color = this.minor_ticks.color;
        this.renderer.line_width = this.minor_ticks.x_width;

        for(var x = 0; x < this.w; x += this.minor_grid.x_offset)
        {
            this.renderer.drawLine(x, this.h, x, this.h + this.minor_ticks.x_len);
        }

        this.renderer.restore();

        this.renderer.up();
        return this;
    };

    this.drawMajorXTicks = function()
    {
        this.renderer.down(SVG.Group().setAttribute("class", "major-x-ticks").get());

        this.renderer.save();

        this.renderer.draw_color = this.major_ticks.color;
        this.renderer.line_width = this.major_ticks.x_width;

        for(var x = 0; x < this.w; x += this.major_grid.x_offset)
        {
            this.renderer.drawLine(x, this.h, x, this.h + this.major_ticks.x_len);
        }

        this.renderer.restore();

        this.renderer.up();
        return this;
    };

    this.drawXTicks = function()
    {
        this.renderer.down(SVG.Group().setAttribute("class", "x-ticks").get());

        this.drawMinorXTicks();
        this.drawMajorXTicks();

        this.renderer.up();

        return this;
    };

    this.drawMinorYTicks = function()
    {
        this.renderer.down(SVG.Group().setAttribute("class", "minor-y-ticks").get());

        this.renderer.save();

        this.renderer.draw_color = this.minor_ticks.color;
        this.renderer.line_width = this.minor_ticks.x_width;

        for(var y = this.h; y > 0; y -= this.minor_grid.y_offset)
        {
            this.renderer.drawLine(0, y, -this.minor_ticks.y_len, y);
        }

        this.renderer.restore();

        this.renderer.up();

        return this;
    };

    this.drawMajorYTicks = function()
    {
        this.renderer.down(SVG.Group().setAttribute("class", "major-y-ticks").get());

        this.renderer.save();

        this.renderer.draw_color = this.major_ticks.color;
        this.renderer.line_width = this.major_ticks.x_width;

        for(var y = this.h; y > 0; y -= this.major_grid.y_offset)
        {
            this.renderer.drawLine(0, y, -this.major_ticks.y_len, y);
        }

        this.renderer.restore();

        this.renderer.up();

        return this;
    };

    this.drawYTicks = function()
    {
        this.renderer.down(SVG.Group().setAttribute("class", "y-ticks").get());

        this.drawMinorYTicks();
        this.drawMajorYTicks();

        this.renderer.up();

        return this;
    };

    this.drawTicks = function()
    {
        this.drawXTicks();
        this.drawYTicks();
        return this;
    };

    this.drawMinorXGrid = function()
    {
        this.renderer.down(SVG.Group().setAttribute("class", "minor-x-grid").get());

        var color = this.draw_color;
        var width = this.line_width;
        this.renderer.draw_color = this.minor_grid.color;
        this.renderer.line_width = this.minor_grid.x_width;

        for(var x = 0; x < this.w; x += this.minor_grid.x_offset)
        {
            this.renderer.drawLine(x, 0, x, this.h);
            // this.renderer.text_baseline = "text-after-edge";
            // this.renderer.drawText((x * this.x_factor).toFixed(1), x, 0 - (this.renderer.line_width * 8));
            this.renderer.text_baseline = "text-before-edge";
            this.renderer.drawText((x * this.x_factor).toFixed(1), x, this.h + (this.renderer.line_width * 8));
        }

        this.renderer.draw_color = color;
        this.renderer.line_width = width;
        this.renderer.text_baseline = "middle";

        this.renderer.up();

        return this;
    };

    this.drawMinorYGrid = function()
    {
        this.renderer.down(SVG.Group().setAttribute("class", "minor-y-grid").get());

        var color = this.draw_color;
        var width = this.line_width;
        this.renderer.draw_color = this.minor_grid.color;
        this.renderer.line_width = this.minor_grid.y_width;

        for(var y = this.h; y > 0; y -= this.minor_grid.y_offset)
        {
            this.renderer.drawLine(0, y, this.w, y);
            this.renderer.text_alignment = "end";
            this.renderer.drawText(((this.h - y) * this.y_factor).toFixed(1), 0 - (this.renderer.line_width * 8), y);
            // this.renderer.text_alignment = "start";
            // this.renderer.drawText(((this.h - y) * this.y_factor).toFixed(1), this.w + (this.renderer.line_width * 8), y);
        }

        this.renderer.draw_color = color;
        this.renderer.line_width = width;
        this.renderer.text_alignment = "middle";

        this.renderer.up();

        return this;
    };

    this.drawMinorGrid = function()
    {
        this.renderer.down(SVG.Group().setAttribute("class", "minor-grid").get());

        this.drawMinorXGrid();
        this.drawMinorYGrid();

        this.renderer.up();

        return this;
    };

    this.drawMajorXGrid = function()
    {
        this.renderer.down(SVG.Group().setAttribute("class", "major-x-grid").get());

        var color = this.draw_color;
        var width = this.line_width;
        this.renderer.draw_color = this.major_grid.color;
        this.renderer.line_width = this.major_grid.x_width;

        for(var x = 0; x < this.w; x += this.major_grid.x_offset)
        {
            this.renderer.drawLine(x, 0, x, this.h);
            // this.renderer.text_baseline = "text-after-edge";
            // this.renderer.drawText((x * this.x_factor).toFixed(1), x, 0 - (this.renderer.line_width * 12));
            this.renderer.text_baseline = "text-before-edge";
            this.renderer.drawText((x * this.x_factor).toFixed(1), x, this.h + (this.renderer.line_width * 12));
        }

        this.renderer.draw_color = color;
        this.renderer.line_width = width;
        this.renderer.text_baseline = "middle";

        this.renderer.up();

        return this;
    };

    this.drawMajorYGrid = function()
    {
        this.renderer.down(SVG.Group().setAttribute("class", "major-y-grid").get());

        var color = this.draw_color;
        var width = this.line_width;
        this.renderer.draw_color = this.major_grid.color;
        this.renderer.line_width = this.major_grid.y_width;

        for(var y = this.h; y > 0; y -= this.major_grid.y_offset)
        {
            this.renderer.drawLine(0, y, this.w, y);
            this.renderer.text_alignment = "end";
            this.renderer.drawText(((this.h - y) * this.y_factor).toFixed(1), 0 - (this.renderer.line_width * 12), y);
            // this.renderer.text_alignment = "start";
            // this.renderer.drawText(((this.h - y) * this.y_factor).toFixed(1), this.w + (this.renderer.line_width * 12), y);
        }

        this.renderer.draw_color = color;
        this.renderer.line_width = width;
        this.renderer.text_alignment = "middle";

        this.renderer.up();

        return this;
    };

    this.drawXGrid = function()
    {
        this.renderer.down(SVG.Group().setAttribute("class", "x-grid").get());

        this.drawMinorXGrid();
        this.drawMajorXGrid();

        this.renderer.up();

        return this;
    };

    this.drawYGrid = function()
    {
        this.renderer.down(SVG.Group().setAttribute("class", "y-grid").get());

        this.drawMinorYGrid();
        this.drawMajorYGrid();

        this.renderer.up();

        return this;
    };

    this.drawMajorGrid = function()
    {
        this.renderer.down(SVG.Group().setAttribute("class", "major-grid").get());

        this.drawMajorXGrid();
        this.drawMajorYGrid();

        this.renderer.up();

        return this;
    };

    this.drawGrid = function()
    {
        this.renderer.down(SVG.Group().setAttribute("class", "grid").get());

        this.drawMinorGrid();
        this.drawMajorGrid();

        this.renderer.up();

        return this;
    };

    this.svg = SVG.Object("svg").get();
    this.renderer = SVG.Renderer(this);
    this.data = data;

    this.x_factor = 1;
    this.y_factor = 1;

    this.background = {color : "rgba(200, 200, 200, 55)"};
    this.axis_lines = {x_axis1 : 2, y_axis1: 2, x_axis2 : 0, y_axis2 : 0, color : "rgba(0, 0, 0, 55)"};
    this.minor_grid = {x_offset : 50, y_offset : 50, x_width : 1, y_width : 1, color : "rgba(30, 30, 30, 55)"};
    this.minor_ticks = {x_len : 5, y_len : 5, x_width : 1, y_width : 1, color : "rgba(30, 30, 30, 55)"};
    this.major_grid = {x_offset : 120, y_offset : 120, x_width : 3, y_width : 3, color : "rgba(80, 80, 80, 55)"};
    this.major_ticks = {x_len : 8, y_len : 8, x_width : 3, y_width : 3, color : "rgba(30, 30, 30, 55)"};

    return this;
}

function LineChart(data)
{
    this.init = function(data)
    {
        var chart_width = this.w;
        var chart_height = this.h;
        var height_min = data.min();
        var height_max = data.max();
        var height_factor = chart_height / height_max;
        var step_x = chart_width / data.length;

        this.x_factor = data.length / chart_width;
        this.y_factor = height_max / chart_height;

        if(data instanceof Array)
        {
            var x = 0;
            var points = [];

            for(var index = 0; index < data.length; index++)
            {
                points.push([x, chart_height - data[index] * height_factor]);
                x += step_x;
            }

            var p = "";
            for(var i = 0; i < points.length; ++i)
            {
                p += points[i][0] + "," + points[i][1] + " ";
            }

            this.path = p;
        }
        return this;
    };

    this.draw = function()
    {
        this.renderer.down(SVG.Group().setAttribute("class", "series").get());

        this.renderer.setLineWidth(2);
        this.renderer.setDrawColor(COLOR.ORANGE);
        this.renderer.drawPolyline(this.path, false);

        this.renderer.up();

        return this;
    };

    Chart.call(this, data);

    this.path = "";

    return this;
}

function Data(data)
{

}