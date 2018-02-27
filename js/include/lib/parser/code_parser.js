var CodeParser = function()
{
    var preprocessor = '%^#.*%';
    var html = '#(<!--.*.)#';
    var ini = '#;.*\n#';
    var tex = '#%.*(\n|%)#';
    var py = '#(\#.*\n|\'{3}.*\'{3})#';
    var c = '#/(\*)?.*(\*)?/#';
    var operator = '#(\.|,|:|;|=|\+|\-|\*|~|\^|\||&|%|\?|!|<|>|\(|\)|\[|\]|\{|\})+#';
    var number = '#\b(0x([A-F]|[0-9])*|[0-9]+\.)?[0-9]+\b#';
    var string = '#"[^"]*"#';
    var char = '#\'[^\']*\'#';

    var tags =
        {
            "docu":         "DOCU__",
            "info":         "INFO__",
            "line":         "LINE__",
            "comment":      "COMMENT__",
            "multiComment": "MULTICOMMENT__",
            "operator":     "OPERATOR__",
            "preprocessor": "PREPROCESSOR__",
            "string":       "STRING__",
            "char":         "CHAR__",
            "number":       "NUMBER__",
            "type":         "TYPE__",
            "customType":   "CUSTOMTYPE__",
            "keyword":      "KEYWORD__",
            "special":      "SPECIAL__"
        };

    var languages =
        {
            "C":
                {
                    "file": "#.*(\.c|\.h)#",
                    "keyword":

                            "#\b("
                            + "(c(ase|on(st|tinue)))|"
                            + "(d(efault|o))|"
                            + "(e(lse|num|xtern))|"
                            + "(f(alse|or))|"
                            + "(n(amespace|ew))|"
                            + "(re(gister|turn))|"
                            + "(s(izeof|t(atic|ruct)|witch))|"
                            + "(t(rue|ypedef))|"
                            + "(auto|break|goto|if|union|volatile|while)"
                            + ")\b#",

                    "type":
                        "#\b(bool|char|double|float|int|long|s(hort|igned)|unsigned|vo(id|latile))\b#",

                    "customType":
                        "(time)",
                    "lineComment":
                        "#//.*\n#",
                    "multiComment":
                        ["#/\*#", "#\*/#"],
                    "special":
                        "%#.*\n%"
                }
            ,
            "C++":
                {
                    "file":
                        "#.*(\.c|\.cpp|\.cc|\.h\|\.hpp|\.hh)#",
                    "keyword":
                        "#\b("
                        + "(a(nd(_eq)?|lign(as|of)|sm|uto))|"
                        + "(b(it(and|or)|reak))|"
                        + "(c(a(se|tch)|lass|o(mpl|n(st(_cast|expr)?|tinue))))|"
                        + "(d(e(cltype|fault|lete)|o|ynamic_cast))|"
                        + "(e(lse|num|x(p(licit|ort)|tern)))|"
                        + "(f(alse|inal|or|riend))|"
                        + "(i(f|nline))|"
                        + "(n(amespace|ew|o(t(_eq)?|except)|ullptr))|"
                        + "(o(perator|r(_eq)?|verride))|"
                        + "(p(r(ivate|otected)|ublic))|"
                        + "(re(gister|interpret_cast|turn))|"
                        + "(s(izeof|t(atic(_(cast|assert))?|ruct)|witch))|"
                        + "(t(emplate|h(is|r(ead_local|ow))|r(ue|y)|ype(def|id|name)))|"
                        + "(u(nion|sing))|"
                        + "(v(irtual|olatile))|"
                        + "(goto|mutable|xor(_eq)?|while)|"
                        + "(__(DATE|FILE|LINE|STDC(_VERSION)?|TIME)__)"
                        + ")\b#",
                    "type":
                        "#\b(bool|(w)?c(har(16|32)?(_t)?)|double|float|int|long|void)\b#",
                    "customType":
                        "#\b(st(ring|d))\b#",
                    "lineComment":
                        "#//.*\n#",
                    "multiComment":
                        ["#/\*#", "#\*/#"],
                    "special":
                        "%^\#.*\n%"
                },
            "PHP":
                {
                    "file":
                        "#.*(\.php)#",
                    "keyword":
                        "#\b("
                        + "(a(bstract|nd|rray|s))|"
                        + "(c(a(llable|se|tch)|l(ass|one)|on(st|tinue)))|"
                        + "(d(e(clare|fault)|ie|o))|"
                        + "(e(cho|lse(if)?|mpty|nd(declare|for(each)?|if|switch|while)|val|x(it|tends)))|"
                        + "(f(alse|inal|or(each)?|unction))|"
                        + "(g(lobal|oto))|"
                        + "(i(f|mplements|n(clude(_once)?|st(anceof|eadof)|terface)|sset))|"
                        + "(n(amespace|ew))|"
                        + "(p(r(i(nt|vate)|otected)|ublic))|"
                        + "(re(quire(_once)?|turn))|"
                        + "(s(tatic|witch))|"
                        + "(t(hrow|r(ait|rue|y)))|"
                        + "(u(nset|se))|"
                        + "(break|list|(x)?or|var|while)|"
                        + "(__(CLASS|DIR|F(ILE|UNCTION)|LINE|METHOD|NAMESPACE|TRAIT)__)"
                        + ")\b#",
                    "type":
                        "",
                    "customType":
                        "",
                    "lineComment":
                        "#//.*\n#",
                    "multiComment":
                        ["#/\*#", "#\*/#"],
                    "special":
                        ""
                },
            "Python":
                {
                    "file":
                        "#.*(\.py)#",
                    "keyword":
                        "#\b("
                        + "(a(nd|s(sert)?))|"
                        + "(c(lass|ontinue))|"
                        + "(d(e(f|l)))|"
                        + "(e(l(se|if)|x(cept|ex)))|"
                        + "(f(inally|or|rom))|"
                        + "(i(f|mport|n|s))|"
                        + "(p(ass|rint))|"
                        + "(r(aise|eturn))|"
                        + "(w(hile|ith))|"
                        + "(break|global|lambda|not|or|try|yield)"
                        + ")\b#",
                    "type":
                        "#====#",
                    "customType":
                        "#====#",
                    "lineComment":
                        "%#.*\n%",
                    "multiComment":
                        ["#'{3}#", "#'{3}#"],
                    "special":
                        "#====#"
                },
            "Java":
                {
                    "file":
                        "#.*(\.java)#",
                    "keyword":
                        "#\b("
                        + "(a(bstract|ssert))|"
                        + "(c(a(se|tch)|lass)|on(st|tinue)))|"
                        + "(d(efault|o))|"
                        + "(e(lse|num|xtends))|"
                        + "(f(inal(ly)?|or))|"
                        + "(i(f|m(plements|port)|n(stanceof|terface)))|"
                        + "(n(ative|ew|ull))"
                        + "(p(ackage|r(ivate|otected)|ublic)))|"
                        + "(s(t(rictfp|atic)|witch|uper|ynchronized))|"
                        + "(t(h(is|row(s)?)|r(ansient|ue|y)))|"
                        + "(break|goto|return|volatile|while)"
                        + ")\b#",
                    "type":
                        "#\b(b(oolean|yte)|char|double|float|int|long|short|void)\b#",
                    "customType":
                        "",
                    "lineComment":
                        "#//.*\n#",
                    "multiComment":
                        ["#/\*#", "#\*/#"],
                    "special":
                        ""
                },
            "JavaScript":
                {
                    "file":
                        "#.*(\.java)#",
                    "keyword":
                        "#\b("
                        + "(a(bstract|rguments|wait))|"
                        + "(b(reak|yte))|"
                        + "(c(a(se|tch)|har|lass|on(st|tinue)))|"
                        + "(d(e(bugger|fault|lete|o(uble)?)))|"
                        + "(e(lse|num|val|x(port|tends)))|"
                        + "(f(alse|inal(ly)?|loat|or|unction))|"
                        + "(i(f|mp(lements|ort|n(stanceof|t(erface)?)?)))|"
                        + "(l(et|ong))|"
                        + "(n(ative|ew|ull))|"
                        + "(p(ackage|r(ivate|otected)|ublic))|"
                        + "(s(hort|tatic|uper|witch|ynchronized))|"
                        + "(t(h(is|r(ow(s)?|ansient|ue|y))|ypeof))|"
                        + "(v(ar|o(id|latile)))|"
                        + "(w(hile|ith))|"
                        + "(goto|return|yield)"
                        + ")\b#",
                    "type":
                        "",
                    "customType":
                        "",
                    "lineComment":
                        "#//.*\n#",
                    "multiComment":
                        ["#/\*#", "#\*/#"],
                    "special":
                        ""
                }
        };

    /*
			Takes an input string which represents the code file and converts the contents to
			html text with css tags.
			@lang : Code Language
			@text : Code content if no file is set in constructor
		*/
    function highlightCode(lang, text, info)
    {
        var timer = new Timer();
        var language = languages[lang];
        var code = "";
        var line_counter = 1;
        var lines = array();
        var is_comment = false;

        if(text !== "")
        {
            buffer = text;
        }
        lines = explode("\n", buffer);

        if(info[0])
        {
            code = tagDocu(filename, count(lines));
        }

        for(l in lines)
        {
            var matches = [];
            var line = lines[l] + "\n";

            if(is_comment)
            {
                if(singleMatch(language["multiComment"][1], line, matches))
                {
                    is_comment = false;
                    var parsed_line = substr(line, 0, matches[0][1] + strlen(matches[0][0]));
                    parsed_line
                        += "</" + tags["multiComment"] + ">" + substr(line, matches[0][1] + strlen(matches[0][0]));
                    code += preg_replace(array('# {2}#', '#\t#'),
                                         array("&nbsp;&nbsp;", "&nbsp;&nbsp;&nbsp;&nbsp;"),
                                         parsed_line);
                    code += tagLine(line_counter, "line");
                    code += "<br>";
                    line_counter++;
                    continue;
                }
                else
                {
                    code += preg_replace(array('# {2}#', '#\t#'),
                                         array("&nbsp;&nbsp;", "&nbsp;&nbsp;&nbsp;&nbsp;"),
                                         line);
                    code += tagLine(line_counter, "line");
                    code += "<br>";
                    line_counter++;
                    continue;
                }
            }
            if(singleMatch(language["special"], line, matches))
            {
                parsed_line = tagLine(line, "special");
                line = parsed_line;
            }
            else if(singleMatch(language["lineComment"], line, matches))
            {
                parsed_line = tagLine(line, "comment");
                line = parsed_line;
            }
            else if(singleMatch(language["multiComment"][0], line, matches))
            {
                is_comment = true;
                line = substr(line, 0, matches[0][1]) + "<" + tags["multiComment"] + ">"
                    + substr(line, matches[0][1], matches[0][1] + strlen(matches[0][0]) + 1);
            }
            else
            {
                if(multiMatch(operator, line, matches))
                {
                    line = tagLineMatches(line, matches, "operator");
                }
                if(multiMatch(number, line, matches))
                {
                    line = tagLineMatches(line, matches, "number");
                }
                if(multiMatch(language["keyword"], line, matches))
                {
                    line = tagLineMatches(line, matches, "keyword");
                }
                if(multiMatch(language["type"], line, matches))
                {
                    line = tagLineMatches(line, matches, "type");
                }
                if(multiMatch(language["customType"], line, matches))
                {
                    line = tagLineMatches(line, matches, "customType");
                }
                if(multiMatch(string, line, matches))
                {
                    line = tagLineMatches(line, matches, "string");
                }
                if(multiMatch(char, line, matches))
                {
                    line = tagLineMatches(line, matches, "char");
                }
            }
            code += preg_replace(array('# {2}#', '#\t#'),
                                 array("&nbsp;&nbsp;", "&nbsp;&nbsp;&nbsp;&nbsp;"),
                                 line);
            code += tagLine(line_counter, "line");
            code += "<br>";
            line_counter++;
        }
        var exec_time = timer.stop();

        return code;
    }

    function singleMatch(pattern, subject, matches)
    {
        if(pattern !== "" && subject !== "")
        {
            if(preg_match(pattern, subject, matches, PREG_OFFSET_CAPTURE))
            {
                return true;
            }
        }
        return false;
    }

    function multiMatch(pattern, subject, matches)
    {
        if(pattern !== "" && subject !== "")
        {
            if(preg_match_all(pattern, subject, matches, PREG_OFFSET_CAPTURE))
            {
                return true;
            }
        }
        return false;
    }

    function getExecTime()
    {
        return exec_time;
    }

    function tagDocu(filename, lines)
    {
        filename = str_replace("\\", "/", filename);
        if(strrpos(filename, "/") > 0)
        {
            filename = substr(filename, strrpos(filename, "/") + 1);
        }
        docu = ""
            + "<docu>"
            + "File: " + filename
            + " [<u>" + lines + " Lines</u>]"
            + "</docu>"
            + "<margin></margin><br>";
        return docu;
    }

    function tagLine(line, tag)
    {
        return "<" + tags[tag] + ">" + line + "</" + tags[tag] + ">";
    }

    function tagLineMatches(line, matches, tag)
    {
        var parsed_line = "";
        var prefix_pos = 0;
        foreach(matches[0] as match = > pos)
        {
            if(pos[1] !== 0)
            {
                parsed_line += substr(line, prefix_pos, pos[1] - prefix_pos);
            }
            parsed_line += "<" + tags[tag] + ">" + substr(line, pos[1], strlen(pos[0])) + "</" + tags[tag] + ">";
            prefix_pos = pos[1] + strlen(pos[0]);
        }
        parsed_line += substr(line, prefix_pos);
        return parsed_line;
    }

    function tagWord(word, tag, keys, values)
    {
        var string = "";

        if(!empty(tag) && !empty(word))
        {
            string += "<span id='" + tag + "'";

            if(!empty(values) && !empty(keys) && (count(values) === count(keys)))
            {
                for(i = 0; i < count(values); i++)
                {
                    string += " " + keys[i] + "='" + values[i] + "'";
                    if(i !== count(values) - 1)
                    {
                        string += " ";
                    }
                }
            }
            string += ">" + word + "</span>";
        }
        return string;
    }
};