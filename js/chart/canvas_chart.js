function Chart(w, h)
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
        return this;
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

    this.setDrawColor = function(color)
    {
        this.draw_color = color;
        this.context.fillStyle = color;
        this.context.strokeStyle = color;
        return this;
    };

    this.setGradient = function(gradient)
    {
        //for()
        return this;
    };

    this.setLineWidth = function(width)
    {
        this.line_width = width;
        this.context.lineWidth = width;
        return this;
    };

    this.setOpacity = function(opacity)
    {
        this.draw_opacity = opacity;
        this.context.globalAlpha = opacity;
        return this;
    };

    this.setFont = function(font)
    {
        this.font = font;
        return this;
    };

    this.setFontFamily = function(family)
    {
        this.font_family = family;
        this.setFont(this.font_size + this.font_size_unit + " " + this.font_family);
        return this;
    };

    this.setFontSize = function(size)
    {
        this.font_size = size;
        this.setFont(this.font_size + this.font_size_unit + " " + this.font_family);
        return this;
    };

    this.setFontSizeUnit = function(unit)
    {
        this.font_size_unit = unit;
        this.setFont(this.font_size + this.font_size_unit + " " + this.font_family);
        return this;
    };

    this.setTextAlignment = function(alignment)
    {
        this.context.textAlign = alignment;
        return this;
    };

    this.setTextBaseline = function(baseline)
    {
        this.text_baseline = baseline;
        this.context.textBaseline = baseline;
        return this;
    };

    this.drawText = function(text, x, y)
    {
        this.context.fillText(text, x, y);

        return this;
    };

    this.drawPoint = function(x, y, size)
    {
        this.context.beginPath();
        this.context.arc(x, y, size/2, 0, 2 * Math.PI);
        this.context.stroke();
        this.context.closePath();

        return this;
    };

    this.drawLine = function(x1, y1, x2, y2)
    {
        this.context.beginPath();
        this.context.moveTo(x1, y1);
        this.context.lineTo(x2, y2);
        this.context.stroke();
        this.context.closePath();

        return this;
    };

    this.drawRect = function(x, y, w, h, filled)
    {
        this.context.strokeRect(x, y, w, h);

        if(filled)
        {
            this.context.fillRect(x, y, w, h);
        }

        return this;
    };

    this.drawCircle = function(x, y, r, filled)
    {
        this.context.beginPath();
        this.context.arc(x, y, r, 0, 2 * Math.PI);
        this.context.stroke();

        if(filled)
        {
            this.context.fill();
        }

        this.context.closePath();

        return this;
    };

    this.drawGrid = function()
    {
        this.context.strokeStyle = this.minor_grid[4];
        this.context.lineWidth = this.minor_grid[2];

        for(var x = 0; x < this.w; x += this.minor_grid[0])
        {
            this.drawLine(x, 0, x, this.h);
        }

        this.context.lineWidth = this.minor_grid[3];
        for(var y = 0; y < this.h; y += this.minor_grid[1])
        {
            this.drawLine(0, y, this.w, y);
        }

        this.context.strokeStyle = this.major_grid[4];
        this.context.lineWidth = this.major_grid[2];
        for(var x = 0; x < this.w; x += this.major_grid[0])
        {
            this.drawLine(x, 0, x, this.h);
        }

        this.context.lineWidth = this.major_grid[3];
        for(var y = 0; y < this.h; y += this.major_grid[1])
        {
            this.drawLine(0, y, this.w, y);
        }

        this.context.lineWidth = this.line_width;
        this.context.strokeStyle = this.draw_color;

        return this;
    };

    this.canvas = document.createElement('canvas');
    this.canvas.width = w;
    this.canvas.height = w;
    this.context = this.canvas.getContext("2d");
    this.w = this.canvas.width;
    this.h = this.canvas.height;

    this.draw_color = "#000000";
    this.draw_opacity = 1.0;
    this.line_width = 1;
    this.font_family = "Arial";
    this.font_size = "18";
    this.font_size_unit = "pt";
    this.text_alignment = "left";
    this.text_baseline = "alphabetic";

    this.minor_grid = [50, 50, 1, 1, "#AAAAAA"];
    this.major_grid = [125, 125, 2, 2, "#555555"];

    this.context.lineCap = "square";
    this.context.lineJoin = "round";

    return this;
}

function LineChart(w, h)
{
    this.draw = function()
    {

    };

    Chart.call(this, w, h);

    return this;
}