var MonsterInsights = function () {
    var e = [],
      t = "",
      n = !1;
    function i() {
      return !!window.monsterinsights_debug_mode;
    }
    function a(e, t, n) {
      var i = {};
      for (var a in e)
        e.hasOwnProperty(a) &&
          ((t && -1 === t.indexOf(a)) ||
            (n && n.indexOf(a) > -1) ||
            (i[a] = e[a]));
      return i;
    }
    function l(t, n, i, l) {
      (l = void 0 !== l ? l : []),
        (function (e, t, n) {
          if (monsterinsights_frontend.ua) {
            var i = a(n, ["event_category", "event_label", "value"]);
            (i.send_to = monsterinsights_frontend.ua), __gtagTracker(e, t, i);
          }
        })(
          (t = void 0 !== t ? t : "event"),
          (n = void 0 !== n ? n : ""),
          (i = void 0 !== i ? i : {})
        ),
        (function (e, t, n) {
          if (!monsterinsights_frontend.v4_id || "event" !== e) return;
          var i = n.event_category || "",
            l = a(n, null, [
              "event_name",
              "event_category",
              "event_label",
              "value",
            ]);
          (l.action = t), (l.send_to = monsterinsights_frontend.v4_id);
          let o = i.replace("-", "_");
          -1 !== i.indexOf("outbound-link")
            ? (o = "click")
            : "download" === i && (o = "file_download"),
            __gtagTracker(e, o, l);
        })(t, n, i),
        (e.valuesArray = l),
        (e.fieldsArray = i),
        (e.fieldsArray.event_action = n),
        (e.tracked = !0),
        s("Tracked: " + l.type),
        s(e);
    }
    function o(t, n, i, a) {
      (t = void 0 !== t ? t : "event"),
        (n = void 0 !== n ? n : ""),
        (a = void 0 !== a ? a : []),
        (i = void 0 !== i ? i : {}),
        __gtagTracker(t, n, i),
        (e.valuesArray = a),
        (e.fieldsArray = i),
        (e.fieldsArray.event_action = n),
        (e.tracked = !0),
        s("Tracked: " + a.type),
        s(e);
    }
    function r(t) {
      (t = void 0 !== t ? t : []),
        (e.valuesArray = t),
        (e.fieldsArray = []),
        (e.tracked = !1),
        s("Not Tracked: " + t.exit),
        s(e);
    }
    function s(e) {
      i() && console.dir(e);
    }
    function c(e) {
      return e.replace(/^\s+|\s+$/gm, "");
    }
    function d() {
      for (
        var e = 0,
          t = document.domain,
          n = t.split("."),
          i = "_gd" + new Date().getTime();
        e < n.length - 1 && -1 == document.cookie.indexOf(i + "=" + i);

      )
        (t = n.slice(-1 - ++e).join(".")),
          (document.cookie = i + "=" + i + ";domain=" + t + ";");
      return (
        (document.cookie =
          i + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;domain=" + t + ";"),
        t
      );
    }
    function _(e) {
      return (e = (e = (e = (e = e.toString()).substring(
        0,
        -1 == e.indexOf("#") ? e.length : e.indexOf("#")
      )).substring(
        0,
        -1 == e.indexOf("?") ? e.length : e.indexOf("?")
      )).substring(e.lastIndexOf("/") + 1, e.length)).length > 0 &&
        -1 !== e.indexOf(".")
        ? (e = e.substring(e.lastIndexOf(".") + 1))
        : "";
    }
    function u() {
      var e = [];
      return (
        "string" == typeof monsterinsights_frontend.download_extensions &&
          (e = monsterinsights_frontend.download_extensions.split(",")),
        e
      );
    }
    function h() {
      var e = [];
      return (
        "string" == typeof monsterinsights_frontend.inbound_paths &&
          (e = JSON.parse(monsterinsights_frontend.inbound_paths)),
        e
      );
    }
    function f(e) {
      var n = u(),
        i = h(),
        a = "unknown",
        l = e.href,
        o = _(e.href),
        r = d(),
        s = e.hostname,
        f = e.protocol,
        g = e.pathname;
      l = l.toString();
      var v,
        m,
        k = e.getAttribute("data-vars-ga-category");
      if (k) return k;
      if (l.match(/^javascript\:/i)) a = "internal";
      else if (f && f.length > 0 && ("tel" == c(f) || "tel:" == c(f)))
        a = "tel";
      else if (f && f.length > 0 && ("mailto" == c(f) || "mailto:" == c(f)))
        a = "mailto";
      else if (
        s &&
        r &&
        s.length > 0 &&
        r.length > 0 &&
        !s.endsWith("." + r) &&
        s !== r
      )
        a = "external";
      else if (g && "{}" != JSON.stringify(i) && g.length > 0) {
        for (var p = i.length, b = 0; b < p; b++)
          if (
            i[b].path &&
            i[b].label &&
            i[b].path.length > 0 &&
            i[b].label.length > 0 &&
            g.startsWith(i[b].path)
          ) {
            (a = "internal-as-outbound"), (t = "outbound-link-" + i[b].label);
            break;
          }
      } else
        s &&
          window.monsterinsights_experimental_mode &&
          s.length > 0 &&
          document.domain.length > 0 &&
          s !== document.domain &&
          (a = "cross-hostname");
      if (
        o &&
        ("unknown" === a || "external" === a) &&
        n.length > 0 &&
        o.length > 0
      )
        for (v = 0, m = n.length; v < m; ++v)
          if (n[v].length > 0 && (l.endsWith(n[v]) || n[v] == o)) {
            a = "download";
            break;
          }
      return "unknown" === a && (a = "internal"), a;
    }
    function g(e) {
      return e.getAttribute("data-vars-ga-label") &&
        e.getAttribute("data-vars-ga-label").replace(/\n/gi, "")
        ? e.getAttribute("data-vars-ga-label").replace(/\n/gi, "")
        : e.title && e.title.replace(/\n/gi, "")
        ? e.title.replace(/\n/gi, "")
        : e.innerText && e.innerText.replace(/\n/gi, "")
        ? e.innerText.replace(/\n/gi, "")
        : e.getAttribute("aria-label") &&
          e.getAttribute("aria-label").replace(/\n/gi, "")
        ? e.getAttribute("aria-label").replace(/\n/gi, "")
        : e.alt && e.alt.replace(/\n/gi, "")
        ? e.alt.replace(/\n/gi, "")
        : e.textContent && e.textContent.replace(/\n/gi, "")
        ? e.textContent.replace(/\n/gi, "")
        : void 0;
    }
    function v(e) {
      var a,
        o = e.srcElement || e.target,
        s = [];
      if (
        ((s.el = o),
        (s.click_type = (function (e) {
          return 1 == e.which
            ? "event.which=1"
            : 2 == e.which
            ? "event.which=2"
            : e.metaKey
            ? "metaKey"
            : e.ctrlKey
            ? "ctrlKey"
            : e.shiftKey
            ? "shiftKey"
            : e.altKey
            ? "altKey"
            : "";
        })(e)),
        "undefined" == typeof __gtagTracker ||
          !(function (e) {
            return (
              1 == e.which ||
              2 == e.which ||
              e.metaKey ||
              e.ctrlKey ||
              e.shiftKey ||
              e.altKey
            );
          })(e))
      )
        return (s.exit = "loaded"), void r(s);
      for (
        ;
        o &&
        (void 0 === o.tagName || "a" != o.tagName.toLowerCase() || !o.href);

      )
        o = o.parentNode;
      if (o && o.href && !o.hasAttribute("xlink:href")) {
        var c = o.href,
          v = _(o.href),
          m = u(),
          k = h(),
          b = monsterinsights_frontend.home_url,
          y = (d(), f(o)),
          x = (function (e, t) {
            var n =
              !(!e.target || e.target.match(/^_(self|parent|top)$/i)) &&
              e.target;
            return (
              (t.ctrlKey || t.shiftKey || t.metaKey || 2 == t.which) &&
                (n = "_blank"),
              n
            );
          })(o, e),
          w = o.getAttribute("data-vars-ga-action"),
          A = o.getAttribute("data-vars-ga-label");
        if (
          ((s.el = o),
          (s.el_href = o.href),
          (s.el_protocol = o.protocol),
          (s.el_hostname = o.hostname),
          (s.el_port = o.port),
          (s.el_pathname = o.pathname),
          (s.el_search = o.search),
          (s.el_hash = o.hash),
          (s.el_host = o.host),
          (s.el_classes = o.getAttribute("class")),
          (s.el_id = o.id),
          (s.debug_mode = i()),
          (s.download_extensions = m),
          (s.inbound_paths = k),
          (s.home_url = b),
          (s.link = c),
          (s.extension = v),
          (s.type = y),
          (s.target = x),
          (s.title = g(o)),
          s.label ||
            s.title ||
            (s.title = (function (e) {
              for (var t, n = e.children, i = 0, a = 0; a < n.length; a++) {
                if ((t = g(n[a]))) return t;
                if (99 == i) return;
                i++;
              }
            })(o)),
          "internal" !== y && "javascript" !== y)
        ) {
          var T = !1,
            O = function () {
              T || (p(), (T = !0), (window.location.href = c));
            };
          x || "mailto" == y || "tel" == y
            ? ("download" == y
                ? (a = {
                    event_category: "download",
                    event_label: A || s.title,
                    file_extension: s.extension,
                    file_name: s.link.replace(/^.*\//g, ""),
                    link_text: A || s.title,
                    link_url: c,
                    link_domain: s.el_hostname,
                    link_classes: s.el_classes,
                    link_id: s.el_id,
                  })
                : "tel" == y
                ? (a = {
                    event_category: "tel",
                    event_label: A || s.title.replace("tel:", ""),
                    tel_number: c.replace("tel:", ""),
                    link_text: A || s.title,
                    link_url: c,
                    link_classes: s.el_classes,
                    link_id: s.el_id,
                  })
                : "mailto" == y
                ? (a = {
                    event_category: "mailto",
                    event_label: A || s.title.replace("mailto:", ""),
                    email_address: c.replace("mailto:", ""),
                    link_text: A || s.title.replace("mailto:", ""),
                    link_url: c,
                    link_classes: s.el_classes,
                    link_id: s.el_id,
                  })
                : "internal-as-outbound" == y
                ? (a = {
                    event_category: t,
                    event_label: A || s.title,
                    event_name: "click",
                    is_affiliate_link: !0,
                    affiliate_label: t.replace("outbound-link-", ""),
                    link_text: A || s.title,
                    link_url: c,
                    link_domain: s.el_hostname,
                    link_classes: s.el_classes,
                    link_id: s.el_id,
                    outbound: !0,
                  })
                : "external" == y
                ? (a = {
                    event_category: "outbound-link",
                    event_label: A || s.title,
                    is_affiliate_link: !1,
                    link_text: A || s.title,
                    link_url: c,
                    link_domain: s.el_hostname,
                    link_classes: s.el_classes,
                    link_id: s.el_id,
                    outbound: !0,
                  })
                : "cross-hostname" == y &&
                  (a = {
                    event_category: "cross-hostname",
                    event_label: A || s.title,
                    link_text: A || s.title,
                    link_url: c,
                    link_domain: s.el_hostname,
                    link_classes: s.el_classes,
                    link_id: s.el_id,
                  }),
              a
                ? l("event", w || c, a, s)
                : y && "internal" != y
                ? ((a = {
                    event_category: y,
                    event_label: A || s.title,
                    link_text: A || s.title,
                    link_url: c,
                    link_domain: s.el_hostname,
                    link_classes: s.el_classes,
                    link_id: s.el_id,
                  }),
                  l("event", w || c, a, s))
                : ((s.exit = "type"), r(s)))
            : ("cross-hostname" != y &&
                "external" != y &&
                "internal-as-outbound" != y &&
                (e.defaultPrevented ||
                  (e.preventDefault
                    ? e.preventDefault()
                    : (e.returnValue = !1))),
              "download" == y
                ? ((a = {
                    event_category: "download",
                    event_label: A || s.title,
                    event_callback: O,
                    file_extension: s.extension,
                    file_name: s.link.replace(/^.*\//g, ""),
                    link_text: A || s.title,
                    link_url: c,
                    link_domain: s.el_hostname,
                    link_classes: s.el_classes,
                    link_id: s.el_id,
                  }),
                  l("event", w || c, a, s))
                : "internal-as-outbound" == y
                ? ((n = !0),
                  (window.onbeforeunload = function (n) {
                    e.defaultPrevented ||
                      (e.preventDefault
                        ? e.preventDefault()
                        : (e.returnValue = !1)),
                      (a = {
                        event_category: t,
                        event_label: A || s.title,
                        event_callback: O,
                        is_affiliate_link: !0,
                        affiliate_label: t.replace("outbound-link-", ""),
                        link_text: A || s.title,
                        link_url: c,
                        link_domain: s.el_hostname,
                        link_classes: s.el_classes,
                        link_id: s.el_id,
                        outbound: !0,
                      }),
                      navigator.sendBeacon && (a.transport = "beacon"),
                      l("event", w || c, a, s),
                      setTimeout(O, 1e3);
                  }))
                : "external" == y
                ? ((n = !0),
                  (window.onbeforeunload = function (e) {
                    (a = {
                      event_category: "outbound-link",
                      event_label: A || s.title,
                      event_callback: O,
                      is_affiliate_link: !1,
                      link_text: A || s.title,
                      link_url: c,
                      link_domain: s.el_hostname,
                      link_classes: s.el_classes,
                      link_id: s.el_id,
                      outbound: !0,
                    }),
                      navigator.sendBeacon && (a.transport = "beacon"),
                      l("event", w || c, a, s);
                  }))
                : "cross-hostname" == y
                ? ((n = !0),
                  (window.onbeforeunload = function (t) {
                    e.defaultPrevented ||
                      (e.preventDefault
                        ? e.preventDefault()
                        : (e.returnValue = !1)),
                      (a = {
                        event_category: "cross-hostname",
                        event_label: A || s.title,
                        event_callback: O,
                        link_text: A || s.title,
                        link_url: c,
                        link_domain: s.el_hostname,
                        link_classes: s.el_classes,
                        link_id: s.el_id,
                      }),
                      navigator.sendBeacon && (a.transport = "beacon"),
                      l("event", w || c, a, s),
                      setTimeout(O, 1e3);
                  }))
                : y && "internal" !== y
                ? ((a = {
                    event_category: y,
                    event_label: A || s.title,
                    event_callback: O,
                    link_text: A || s.title,
                    link_url: c,
                    link_domain: s.el_hostname,
                    link_classes: s.el_classes,
                    link_id: s.el_id,
                  }),
                  l("event", w || c, a, s))
                : ((s.exit = "type"), r(s)),
              "external" != y &&
              "cross-hostname" != y &&
              "internal-as-outbound" != y
                ? setTimeout(O, 1e3)
                : "external" == y
                ? setTimeout(function () {
                    (s.exit = "external"), r(s);
                  }, 1100)
                : "cross-hostname" == y
                ? setTimeout(function () {
                    (s.exit = "cross-hostname"), r(s);
                  }, 1100)
                : setTimeout(function () {
                    (s.exit = "internal-as-outbound"), r(s);
                  }, 1100),
              setTimeout(p, 100));
        } else p(), (s.exit = "internal"), r(s);
      } else (s.exit = "notlink"), r(s);
    }
    (this.setLastClicked = function (t, n, i) {
      (t = void 0 !== t ? t : []),
        (n = void 0 !== n ? n : []),
        (i = void 0 !== i && i),
        (e.valuesArray = t),
        (e.fieldsArray = n);
    }),
      (this.getLastClicked = function () {
        return e;
      }),
      (this.setInternalAsOutboundCategory = function (e) {
        t = e;
      }),
      (this.getInternalAsOutboundCategory = function () {
        return t;
      }),
      (this.sendEvent = function (e, t, n) {
        o(e, t, n, []);
      });
    var m = window.location.hash;
    function k() {
      "true" === monsterinsights_frontend.hash_tracking &&
      m != window.location.hash &&
      (monsterinsights_frontend.ua || monsterinsights_frontend.v4_id)
        ? ((m = window.location.hash),
          monsterinsights_frontend.ua &&
            __gtagTracker("config", monsterinsights_frontend.ua, {
              page_path: location.pathname + location.search + location.hash,
            }),
          monsterinsights_frontend.v4_id &&
            __gtagTracker("config", monsterinsights_frontend.v4_id, {
              page_path: location.pathname + location.search + location.hash,
            }),
          s(
            "Hash change to: " +
              location.pathname +
              location.search +
              location.hash
          ))
        : s(
            "Hash change to (untracked): " +
              location.pathname +
              location.search +
              location.hash
          );
    }
    function p() {
      n && (window.onbeforeunload = null);
    }
    var b = window;
    b.addEventListener
      ? (b.addEventListener(
          "load",
          function () {
            document.body.addEventListener("click", v, !1);
          },
          !1
        ),
        window.addEventListener("hashchange", k, !1))
      : b.attachEvent &&
        (b.attachEvent("onload", function () {
          document.body.attachEvent("onclick", v);
        }),
        window.attachEvent("onhashchange", k)),
      "function" != typeof String.prototype.endsWith &&
        (String.prototype.endsWith = function (e) {
          return -1 !== this.indexOf(e, this.length - e.length);
        }),
      "function" != typeof String.prototype.startsWith &&
        (String.prototype.startsWith = function (e) {
          return 0 === this.indexOf(e);
        }),
      "function" != typeof Array.prototype.lastIndexOf &&
        (Array.prototype.lastIndexOf = function (e) {
          "use strict";
          if (null == this) throw new TypeError();
          var t,
            n,
            i = Object(this),
            a = i.length >>> 0;
          if (0 === a) return -1;
          for (
            t = a - 1,
              arguments.length > 1 &&
                ((t = Number(arguments[1])) != t
                  ? (t = 0)
                  : 0 != t &&
                    t != 1 / 0 &&
                    t != -1 / 0 &&
                    (t = (t > 0 || -1) * Math.floor(Math.abs(t)))),
              n = t >= 0 ? Math.min(t, a - 1) : a - Math.abs(t);
            n >= 0;
            n--
          )
            if (n in i && i[n] === e) return n;
          return -1;
        });
  },
  MonsterInsightsObject = new MonsterInsights();
