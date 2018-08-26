Array.prototype.max = function()
{
    return Math.max.apply(null, this);
};

Array.prototype.min = function()
{
    return Math.min.apply(null, this);
};

let COLOR =
    {
        TRANSPARENT: "rgba(0, 0, 0, 0)",
        BLACK:       "rgba(0, 0, 0, 255)",
        BLUE:        "rgba(0, 0, 255, 255)",
        GREEN:       "rgba(0, 255, 0, 255)",
        CYAN:        "rgba(0, 255, 255, 255)",
        DARK_GRAY:   "rgba(32, 32, 32, 32)",
        OLIVE:       "rgba(96, 128, 0, 255)",
        GRAY:        "rgba(128, 128, 128, 255)",
        PURPLE:      "rgba(128, 128, 255, 255)",
        LIME:        "rgba(128, 255, 128, 255)",
        LIGHT_BLUE:  "rgba(128, 192, 255, 255)",
        ORANGE:      "rgba(200, 128, 0, 255)",
        RED:         "rgba(255, 0, 0, 255)",
        PINK:        "rgba(255, 96, 128, 255)",
        MAGENTA:     "rgba(255, 0, 255, 255)",
        YELLOW:      "rgba(255, 255, 0, 255)",
        WHITE:       "rgba(255, 255, 255, 255)"
    };

let SERIES_COLORS =
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

/*
 * Represents a container.
 */
class SVGWidget
{
    constructor(type)
    {
        this.container = null;
        this.setNSTag("http://www.w3.org/2000/svg", type);
    }

    get()
    {
        return this.container;
    }

    setNSTag(ns, tag)
    {
        this.container = document.createElementNS(ns, tag);
        return this;
    }

    setAttribute(key, value)
    {
        this.container.setAttribute(key, value);
        return this;
    }

    setStyle(key, value)
    {
        this.container.style[key] = value;
        return this;
    }
}

class Group extends SVGWidget
{
    constructor()
    {
        super("g");
    }
}

class Text extends SVGWidget
{
    constructor(text, x, y)
    {
        super("text");
        this.setAttribute("x", x);
        this.setAttribute("y", y);
        this.container.innerHTML = text;
    }
}

class Point extends SVGWidget
{
    constructor(x, y, size)
    {
        super("circle");

        size = (size / 2).toString();

        this.setAttribute("cx", x);
        this.setAttribute("cy", y);
        this.setAttribute("r", size);
    }
}

class Line extends SVGWidget
{
    constructor(x1, y1, x2, y2)
    {
        super("line");

        this.setAttribute("x1", x1);
        this.setAttribute("y1", y1);
        this.setAttribute("x2", x2);
        this.setAttribute("y2", y2);
    }
}

class Rect extends SVGWidget
{
    constructor(x, y, w, h)
    {
        super("rect");

        this.setAttribute("x", x);
        this.setAttribute("y", y);
        this.setAttribute("width", w);
        this.setAttribute("height", h);
    }
}

class Circle extends SVGWidget
{
    constructor(x, y, r)
    {
        super("circle");

        this.setAttribute("cx", x);
        this.setAttribute("cy", y);
        this.setAttribute("r", r);
    }
}

class Ellipse extends SVGWidget
{
    constructor(cx, cy, rx, ry)
    {
        super("ellipse");

        this.setAttribute("cx", cx);
        this.setAttribute("cy", cy);
        this.setAttribute("rx", rx);
        this.setAttribute("ry", ry);
    }
}

class Polyline extends SVGWidget
{
    constructor(points)
    {
        super("polyline");

        this.setAttribute("points", points || "");
    }
}

class Polygon extends SVGWidget
{
    constructor(points)
    {
        super("polygon");

        this.setAttribute("points", points);
    }
}

class Path extends SVGWidget
{
    constructor(path)
    {
        super("path");

        this.setAttribute("d", path);
    }
}

class Renderer
{
    constructor(chart)
    {
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
    }

    save()
    {
        for(let key in this)
        {
            this.state[key] = this[key];
        }
        return this;
    }

    restore()
    {
        for(let key in this)
        {
            this[key] = this.state[key];
        }
        return this;
    }

    append(container)
    {
        this.head.appendChild(container);

        return this;
    }

    up()
    {
        if(this.head.parent)
        {
            this.head = this.head.parent;
        }
        return this;
    }

    top()
    {
        return this.head;
    }

    down(group)
    {
        let new_head = group;
        this.head.child = new_head;
        new_head.parent = this.head;
        this.append(new_head);
        this.head = new_head;
        return this;
    }

    setDrawColor(color)
    {
        this.draw_color = color;
        return this;
    }

    setFillColor(color)
    {
        this.fill_color = color;
        return this;
    }

    setLineWidth(width)
    {
        width = width.toString();
        this.line_width = width;
        return this;
    }

    setOpacity(opacity)
    {
        opacity = opacity.toString();
        this.opacity = opacity;
        return this;
    }

    setFontFamily(family)
    {
        this.font_family = family;
        return this;
    }

    setFontSize(size)
    {
        size = size.toString();
        this.font_size = size;
        return this;
    }

    setFontSizeUnit(unit)
    {
        this.font_size_unit = unit;
        return this;
    }

    setTextAlignment(alignment)
    {
        this.text_alignment = alignment;
        return this;
    }

    setTextBaseline(baseline)
    {
        this.text_baseline = baseline;
        return this;
    }

    drawText(text, x, y)
    {
        let el = new Text(text, x, y).get();

        el.setAttribute("stroke", this.text_color_fg);
        el.setAttribute("fill", this.text_color_bg);
        el.setAttribute("text-anchor", this.text_alignment);
        el.setAttribute("alignment-baseline", this.text_baseline);
        el.setAttribute("font-family", this.font_family);
        el.setAttribute("font-size", this.font_size + this.font_size_unit);

        this.append(el);

        return this;
    }

    drawPoint(x, y, size)
    {
        let el = new Point(x, y, size).get();

        el.setAttribute("stroke", this.draw_color);

        this.append(el);

        return this;
    }

    drawLine(x1, y1, x2, y2)
    {
        let el = new Line(x1, y1, x2, y2).get();

        el.setAttribute("stroke", this.draw_color);
        el.setAttribute("stroke-width", this.line_width);

        this.append(el);

        return this;
    }

    drawRect(x, y, w, h, filled)
    {
        let el = new Rect(x, y, w, h, filled).get();

        el.setAttribute("stroke", this.draw_color);
        el.setAttribute("stroke-width", this.line_width);
        el.setAttribute("fill", filled ? this.fill_color : "none");

        this.append(el);

        return this;
    }

    drawCircle(x, y, r, filled)
    {
        let el = new Circle(x, y, r, filled).get();

        el.setAttribute("stroke", this.draw_color);
        el.setAttribute("stroke-width", this.line_width);
        el.setAttribute("fill", filled ? this.fill_color : "none");

        this.append(el);

        return this;
    }

    drawEllipse(cx, cy, rx, ry, filled)
    {
        let el = new Ellipse(cx, cy, rx, ry, filled).get();

        el.setAttribute("stroke", this.draw_color);
        el.setAttribute("stroke-width", this.line_width);
        el.setAttribute("fill", filled ? this.fill_color : "none");

        this.append(el);

        return this;
    };

    drawPolyline(points, filled)
    {
        let el = new Polyline(points).get();

        el.setAttribute("stroke", this.draw_color);
        el.setAttribute("stroke-width", this.line_width);
        el.setAttribute("fill", filled ? this.fill_color : "none");

        this.append(el);

        return this;
    }

    drawPolygon(points)
    {
        let el = new Path(points).get();

        el.setAttribute("stroke", this.draw_color);
        el.setAttribute("stroke-width", this.line_width);

        this.append(el);

        return this;
    }

    drawPath(p, filled)
    {
        let el = new Path(p, filled).get();

        el.setAttribute("stroke", this.draw_color);
        el.setAttribute("stroke-width", this.line_width);

        this.append(el);

        return this;
    }
}

class Chart
{
    constructor(data)
    {
        this.svg = new SVGWidget("svg").get();
        this.renderer = new Renderer(this);
        this.data = data;

        this.x_factor = 1;
        this.y_factor = 1;

        this.background = {color: "rgba(200, 200, 200, 55)"};
        this.axis_lines = {x_axis1: 2, y_axis1: 2, x_axis2: 0, y_axis2: 0, color: "rgba(0, 0, 0, 55)"};
        this.minor_grid = {x_offset: 50, y_offset: 50, x_width: 1, y_width: 1, color: "rgba(30, 30, 30, 55)"};
        this.minor_ticks = {x_len: 5, y_len: 5, x_width: 1, y_width: 1, color: "rgba(30, 30, 30, 55)"};
        this.major_grid = {x_offset: 120, y_offset: 120, x_width: 3, y_width: 3, color: "rgba(80, 80, 80, 55)"};
        this.major_ticks = {x_len: 8, y_len: 8, x_width: 3, y_width: 3, color: "rgba(30, 30, 30, 55)"};
    }

    attach(container)
    {
        let element = document.getElementById(container).appendChild(this.svg);

        this.svg.setAttribute("width", element.clientWidth);
        this.svg.setAttribute("height", element.clientHeight);
        this.w = this.svg.width.animVal.value;
        this.h = this.svg.height.animVal.value;

        this.init(this.data);

        return this;
    }

    getRenderer()
    {
        return this.renderer;
    }

    setMinorGrid(width, height, x_size, y_size, color)
    {
        this.minor_grid = [width, height, x_size, y_size, color];
        return this;
    }

    setMajorGrid(width, height, x_size, y_size, color)
    {
        this.major_grid = [width, height, x_size, y_size, color];
        return this;
    }

    drawBackground()
    {
        this.renderer.save();

        this.renderer.draw_color = this.background.color;
        this.renderer.fill_color = this.background.color;
        this.renderer.drawRect(0, 0, this.w, this.h, true);

        this.renderer.restore();
        return this;
    }

    drawXAxis()
    {
        this.renderer.down(new Group().setAttribute("class", "x-axis").get());

        this.renderer.save();
        this.renderer.draw_color = this.axis_lines.color;

        this.renderer.line_width = this.axis_lines.y_axis1;
        this.renderer.drawLine(0, this.h, this.w, this.h);

        this.renderer.line_width = this.axis_lines.y_axis2;
        this.renderer.drawLine(0, 0, this.w, 0);

        this.renderer.restore();

        this.renderer.up();

        return this;
    }

    drawYAxis()
    {
        this.renderer.down(new Group().setAttribute("class", "y-axis").get());

        let color = this.draw_color;
        let width = this.line_width;
        this.renderer.draw_color = this.axis_lines.color;

        this.renderer.line_width = this.axis_lines.x_axis1;
        this.renderer.drawLine(0, 0, 0, this.h);

        this.renderer.line_width = this.axis_lines.x_axis2;
        this.renderer.drawLine(this.w, this.w, 0, this.h);

        this.renderer.draw_color = color;
        this.renderer.line_width = width;

        this.renderer.up();

        return this;
    }

    drawAxis()
    {
        this.renderer.down(new Group().setAttribute("class", "axis").get());

        this.drawXAxis();
        this.drawYAxis();

        this.renderer.up();

        return this;
    }

    drawMinorXTicks()
    {
        this.renderer.down(new Group().setAttribute("class", "minor-x-ticks").get());

        this.renderer.save();

        this.renderer.draw_color = this.minor_ticks.color;
        this.renderer.line_width = this.minor_ticks.x_width;

        for(let x = 0; x < this.w; x += this.minor_grid.x_offset)
        {
            this.renderer.drawLine(x, this.h, x, this.h + this.minor_ticks.x_len);
        }

        this.renderer.restore();

        this.renderer.up();
        return this;
    }

    drawMajorXTicks()
    {
        this.renderer.down(new Group().setAttribute("class", "major-x-ticks").get());

        this.renderer.save();

        this.renderer.draw_color = this.major_ticks.color;
        this.renderer.line_width = this.major_ticks.x_width;

        for(let x = 0; x < this.w; x += this.major_grid.x_offset)
        {
            this.renderer.drawLine(x, this.h, x, this.h + this.major_ticks.x_len);
        }

        this.renderer.restore();

        this.renderer.up();
        return this;
    }

    drawXTicks()
    {
        this.renderer.down(new Group().setAttribute("class", "x-ticks").get());

        this.drawMinorXTicks();
        this.drawMajorXTicks();

        this.renderer.up();

        return this;
    }

    drawMinorYTicks()
    {
        this.renderer.down(new Group().setAttribute("class", "minor-y-ticks").get());

        this.renderer.save();

        this.renderer.draw_color = this.minor_ticks.color;
        this.renderer.line_width = this.minor_ticks.x_width;

        for(let y = this.h; y > 0; y -= this.minor_grid.y_offset)
        {
            this.renderer.drawLine(0, y, -this.minor_ticks.y_len, y);
        }

        this.renderer.restore();

        this.renderer.up();

        return this;
    }

    drawMajorYTicks()
    {
        this.renderer.down(new Group().setAttribute("class", "major-y-ticks").get());

        this.renderer.save();

        this.renderer.draw_color = this.major_ticks.color;
        this.renderer.line_width = this.major_ticks.x_width;

        for(let y = this.h; y > 0; y -= this.major_grid.y_offset)
        {
            this.renderer.drawLine(0, y, -this.major_ticks.y_len, y);
        }

        this.renderer.restore();

        this.renderer.up();

        return this;
    }

    drawYTicks()
    {
        this.renderer.down(new Group().setAttribute("class", "y-ticks").get());

        this.drawMinorYTicks();
        this.drawMajorYTicks();

        this.renderer.up();

        return this;
    }

    drawTicks()
    {
        this.drawXTicks();
        this.drawYTicks();
        return this;
    }

    drawMinorXGrid()
    {
        this.renderer.down(new Group().setAttribute("class", "minor-x-grid").get());

        let color = this.draw_color;
        let width = this.line_width;
        this.renderer.draw_color = this.minor_grid.color;
        this.renderer.line_width = this.minor_grid.x_width;

        for(let x = 0; x < this.w; x += this.minor_grid.x_offset)
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
    }

    drawMinorYGrid()
    {
        this.renderer.down(new Group().setAttribute("class", "minor-y-grid").get());

        let color = this.draw_color;
        let width = this.line_width;
        this.renderer.draw_color = this.minor_grid.color;
        this.renderer.line_width = this.minor_grid.y_width;

        for(let y = this.h; y > 0; y -= this.minor_grid.y_offset)
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
    }

    drawMinorGrid()
    {
        this.renderer.down(new Group().setAttribute("class", "minor-grid").get());

        this.drawMinorXGrid();
        this.drawMinorYGrid();

        this.renderer.up();

        return this;
    }

    drawMajorXGrid()
    {
        this.renderer.down(new Group().setAttribute("class", "major-x-grid").get());

        let color = this.draw_color;
        let width = this.line_width;
        this.renderer.draw_color = this.major_grid.color;
        this.renderer.line_width = this.major_grid.x_width;

        for(let x = 0; x < this.w; x += this.major_grid.x_offset)
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
    }

    drawMajorYGrid()
    {
        this.renderer.down(new Group().setAttribute("class", "major-y-grid").get());

        let color = this.draw_color;
        let width = this.line_width;
        this.renderer.draw_color = this.major_grid.color;
        this.renderer.line_width = this.major_grid.y_width;

        for(let y = this.h; y > 0; y -= this.major_grid.y_offset)
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
    }

    drawXGrid()
    {
        this.renderer.down(new Group().setAttribute("class", "x-grid").get());

        this.drawMinorXGrid();
        this.drawMajorXGrid();

        this.renderer.up();

        return this;
    }

    drawYGrid()
    {
        this.renderer.down(new Group().setAttribute("class", "y-grid").get());

        this.drawMinorYGrid();
        this.drawMajorYGrid();

        this.renderer.up();

        return this;
    }

    drawMajorGrid()
    {
        this.renderer.down(new Group().setAttribute("class", "major-grid").get());

        this.drawMajorXGrid();
        this.drawMajorYGrid();

        this.renderer.up();

        return this;
    }

    drawGrid()
    {
        this.renderer.down(new Group().setAttribute("class", "grid").get());

        this.drawMinorGrid();
        this.drawMajorGrid();

        this.renderer.up();

        return this;
    }
}

class LineChart extends Chart
{
    constructor(data)
    {
        super(data);
    }

    init(data)
    {
        let chart_width = this.w;
        let chart_height = this.h;
        let height_min = data.min();
        let height_max = data.max();
        let height_factor = chart_height / height_max;
        let step_x = chart_width / data.length;

        this.x_factor = data.length / chart_width;
        this.y_factor = height_max / chart_height;

        if(data instanceof Array)
        {
            let x = 0;
            let points = [];

            for(let index = 0; index < data.length; index++)
            {
                points.push([x, chart_height - data[index] * height_factor]);
                x += step_x;
            }

            let p = "";
            for(let i = 0; i < points.length; ++i)
            {
                p += points[i][0] + "," + points[i][1] + " ";
            }

            this.path = p;
        }
        return this;
    }

    draw()
    {
        this.renderer.down(new Group().setAttribute("class", "series").get());

        this.renderer.setLineWidth(2);
        this.renderer.setDrawColor(COLOR.ORANGE);
        this.renderer.drawPolyline(this.path, false);

        this.renderer.up();

        return this;
    }
}

class Data
{

}