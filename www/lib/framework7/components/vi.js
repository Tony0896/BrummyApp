(function framework7ComponentLoader(e, t) {
    void 0 === t && (t = !0);
    var a = document,
        o = window,
        i = e.$,
        n = (e.Template7, e.utils),
        r = e.device,
        l = (e.support, e.Class),
        s =
            (e.Modal,
            e.ConstructorMethods,
            e.ModalMethods,
            (function (e) {
                function t(t, a) {
                    void 0 === a && (a = {}), e.call(this, a, [t]);
                    var l,
                        s = this;
                    if (!o.vi) throw new Error("Framework7: vi SDK not found.");
                    void 0 !== o.orientation && (l = -90 === o.orientation || 90 === o.orientation ? "horizontal" : "vertical");
                    var d = n.extend({}, t.params.vi, {
                        appId: t.id,
                        appVer: t.version,
                        language: t.language,
                        width: t.width,
                        height: t.height,
                        os: r.os,
                        osVersion: r.osVersion,
                        orientation: l,
                    });
                    s.useModulesParams(d), (s.params = n.extend(d, a));
                    var c = {},
                        p = "on autoplay fallbackOverlay fallbackOverlayText enabled".split(" ");
                    if (
                        (Object.keys(s.params).forEach(function (e) {
                            if (!(p.indexOf(e) >= 0)) {
                                var t = s.params[e];
                                [null, void 0].indexOf(t) >= 0 || (c[e] = t);
                            }
                        }),
                        !s.params.appId)
                    )
                        throw new Error('Framework7: "app.id" is required to display an ad. Make sure you have specified it on app initialization.');
                    if (!s.params.placementId) throw new Error('Framework7: "placementId" is required to display an ad.');
                    function u() {
                        var e = i("iframe#viAd");
                        0 !== e.length && e.css({ width: t.width + "px", height: t.height + "px" });
                    }
                    function v() {
                        s.$overlayEl && (s.$overlayEl.off("click touchstart"), s.$overlayEl.remove());
                    }
                    (s.ad = new o.vi.Ad(c)),
                        n.extend(s.ad, {
                            onAdReady: function () {
                                t.on("resize", u), s.emit("local::ready"), s.params.autoplay && s.start();
                            },
                            onAdStarted: function () {
                                s.emit("local::started");
                            },
                            onAdClick: function (e) {
                                s.emit("local::click", e);
                            },
                            onAdImpression: function () {
                                s.emit("local::impression");
                            },
                            onAdStopped: function (e) {
                                t.off("resize", u),
                                    v(),
                                    s.emit("local::stopped", e),
                                    "complete" === e && (s.emit("local::complete"), s.emit("local::completed")),
                                    "userexit" === e && s.emit("local::userexit"),
                                    (s.destroyed = !0);
                            },
                            onAutoPlayFailed: function (e, a) {
                                s.emit("local::autoplayFailed", e, a),
                                    e &&
                                        e.name &&
                                        -1 !== e.name.indexOf("NotAllowedError") &&
                                        s.params.fallbackOverlay &&
                                        (function (e) {
                                            var a;
                                            e &&
                                                ((s.$overlayEl = i(
                                                    (
                                                        '\n        <div class="vi-overlay no-fastclick">\n          ' +
                                                        (s.params.fallbackOverlayText
                                                            ? '<div class="vi-overlay-text">' + s.params.fallbackOverlayText + "</div>"
                                                            : "") +
                                                        '\n          <div class="vi-overlay-play-button"></div>\n        </div>\n      '
                                                    ).trim()
                                                )),
                                                s.$overlayEl.on("touchstart", function () {
                                                    a = n.now();
                                                }),
                                                s.$overlayEl.on("click", function () {
                                                    if (!(n.now() - a > 300)) {
                                                        if (e) return e.play(), void v();
                                                        s.start(), v();
                                                    }
                                                }),
                                                t.root.append(s.$overlayEl));
                                        })(a);
                            },
                            onAdError: function (e) {
                                v(), t.off("resize", u), s.emit("local::error", e), (s.destroyed = !0);
                            },
                        }),
                        s.init(),
                        n.extend(s, { app: t });
                }
                return (
                    e && (t.__proto__ = e),
                    (t.prototype = Object.create(e && e.prototype)),
                    (t.prototype.constructor = t),
                    (t.prototype.start = function () {
                        this.destroyed || (this.ad && this.ad.startAd());
                    }),
                    (t.prototype.pause = function () {
                        this.destroyed || (this.ad && this.ad.pauseAd());
                    }),
                    (t.prototype.resume = function () {
                        this.destroyed || (this.ad && this.ad.resumeAd());
                    }),
                    (t.prototype.stop = function () {
                        this.destroyed || (this.ad && this.ad.stopAd());
                    }),
                    (t.prototype.init = function () {
                        this.destroyed || (this.ad && this.ad.initAd());
                    }),
                    (t.prototype.destroy = function () {
                        (this.destroyed = !0), this.emit("local::beforeDestroy"), n.deleteProps(this);
                    }),
                    t
                );
            })(l)),
        d = {
            name: "vi",
            params: {
                vi: {
                    enabled: !1,
                    autoplay: !0,
                    fallbackOverlay: !0,
                    fallbackOverlayText: "Please watch this ad",
                    showMute: !0,
                    startMuted: (r.ios || r.android) && !r.cordova,
                    appId: null,
                    appVer: null,
                    language: null,
                    width: null,
                    height: null,
                    placementId: "pltd4o7ibb9rc653x14",
                    placementType: "interstitial",
                    videoSlot: null,
                    showProgress: !0,
                    showBranding: !0,
                    os: null,
                    osVersion: null,
                    orientation: null,
                    age: null,
                    gender: null,
                    advertiserId: null,
                    latitude: null,
                    longitude: null,
                    accuracy: null,
                    storeId: null,
                    ip: null,
                    manufacturer: null,
                    model: null,
                    connectionType: null,
                    connectionProvider: null,
                },
            },
            create: function () {
                var e = this;
                e.vi = {
                    sdkReady: !1,
                    createAd: function (t) {
                        return new s(e, t);
                    },
                    loadSdk: function () {
                        // if (!e.vi.sdkReady) {
                        //     var t = a.createElement("script");
                        //     (t.onload = function () {
                        //         e.emit("viSdkReady"), (e.vi.sdkReady = !0);
                        //     }),
                        //         (t.src = "https://c.vi-serve.com/viadshtml/vi.min.js"),
                        //         i("head").append(t);
                        // }
                    },
                };
            },
            on: {
                init: function () {
                    (this.params.vi.enabled || (this.passedParams.vi && !1 !== this.passedParams.vi.enabled)) && this.vi.loadSdk();
                },
            },
        };
    if (t) {
        if (e.prototype.modules && e.prototype.modules[d.name]) return;
        e.use(d), e.instance && (e.instance.useModuleParams(d, e.instance.params), e.instance.useModule(d));
    }
    return d;
})(Framework7, typeof Framework7AutoInstallComponent === "undefined" ? undefined : Framework7AutoInstallComponent);
