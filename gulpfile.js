const gulp = require("gulp");
const clean = require("gulp-clean");
const shell = require("gulp-shell");
const workbox = require("workbox-build");
const uglify = require("gulp-uglify");
const pipeline = require('readable-stream').pipeline;

gulp.task("clean", function () {
    return gulp.src("public", { read: false, allowEmpty: true })
    .pipe(clean());
});

gulp.task("hugo-build", shell.task(["hugo --gc --minify"]));

gulp.task("generate-service-worker", () => {
    return workbox.generateSW({
        cacheId: "hugo-theme-meme",
        globDirectory: "./public",
        globPatterns: [
            "**/*.{html,css,js,woff2}"
        ],
        swDest: "./public/sw.js",
        modifyUrlPrefix: {
            "": "/"
        },
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        skipWaiting: true,
        ignoreUrlParametersMatching: [/./],
        offlineGoogleAnalytics: true,
        maximumFileSizeToCacheInBytes: 50 * 1024 * 1024,
        runtimeCaching: [
            {
                urlPattern: /(?:\/)$/,
                handler: "cacheFirst",
                options: {
                    cacheName: "html",
                    expiration: {
                        maxAgeSeconds: 60 * 60 * 24 * 7,
                    },
                },
            },
            {
                urlPattern: /\.(?:png|jpg|jpeg|gif|bmp|webp|svg|ico)$/,
                handler: "cacheFirst",
                options: {
                    cacheName: "images",
                    expiration: {
                        maxEntries: 1000,
                        maxAgeSeconds: 60 * 60 * 24 * 365,
                    },
                },
            },
            {
                urlPattern: /\.(?:mp3|wav|mp4|webm|ogg)$/,
                handler: "cacheFirst",
                options: {
                    cacheName: "media",
                    expiration: {
                        maxEntries: 1000,
                        maxAgeSeconds: 60 * 60 * 24 * 365,
                    },
                },
            },
            {
                urlPattern: /\.(?:json)$/,
                handler: "cacheFirst",
                options: {
                    cacheName: "json",
                    expiration: {
                        maxEntries: 1000,
                        maxAgeSeconds: 60 * 60 * 24 * 365,
                    },
                },
            }
        ],
    });
});

gulp.task("uglify", function () {
    return pipeline(
        gulp.src("./public/sw.js"),
        uglify(),
        gulp.dest("./public")
  );
});

gulp.task("build", gulp.series("clean", "hugo-build", "generate-service-worker", "uglify"));
