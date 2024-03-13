function addmarker(ev) {
    let layer = {
        id: "myselectionlayer",
        role: window.qwc2.LayerRole.SELECTION
    };
    let feature = {
        id: 'mymarker',
        geometry: {
            type: 'Point',
            coordinates: [2684267, 1247815]
        },
        properties: { label: "Text" },
        crs: "EPSG:2056",
        styleName: 'marker'
    };
    window.qwc2.addLayerFeatures(layer, [feature]);
}
function removemarker(ev) {
    window.qwc2.removeLayerFeatures("myselectionlayer", ["mymarker"]);
}
function addpoly(ev) {
    let layer = {
        id: "myselectionlayer",
        role: window.qwc2.LayerRole.SELECTION
    };
    let feature = {
        id: 'mypoly',
        geometry: {
            type: 'Polygon',
            coordinates: [[[2684267, 1247815], [2686897, 1246706], [2683829, 1243509], [2677152, 1245933]]]
        },
        properties: { label: "Polygon" },
        crs: "EPSG:2056",
        styleName: 'default',
        styleOptions: {
            strokeColor: [255, 0, 0, 1],
            strokeWidth: 4,
            strokeDash: [4],
            fillColor: [255, 255, 255, 0.33],
            textFill: "blue",
            textStroke: "white",
            textFont: '20pt sans-serif'
        }
    };
    window.qwc2.addLayerFeatures(layer, [feature]);
}
function removepoly(ev) {
    window.qwc2.removeLayerFeatures("myselectionlayer", ["mypoly"]);
}
function removeall(ev) {
    window.qwc2.removeLayer("myselectionlayer");
}
function pantohb(ev) {
    window.qwc2.panTo([2683002, 1248093], "EPSG:2056");
}
function zoomtohb(ev) {
    window.qwc2.zoomToExtent([2682576, 1247916, 2683339, 1248222], "EPSG:2056");
}
function drawpoint(ev) {
    window.qwc2.drawGeometry("Point", "Draw a point", function(result, crs) { console.log(result); console.log(crs); }, {drawMultiple: true});
}
function drawline(ev) {
    window.qwc2.drawGeometry("LineString", "Draw a line", function(result, crs) { console.log(result); console.log(crs); }, {
        snapping: true,
        drawMultiple: true,
        initialFeatures: [{
            type: "Feature",
            geometry: {
                type: "LineString",
                coordinates: [
                    [2682632, 1247832],
                    [2692632, 1247832]
                ]
            }
        }]
    });
}
function drawpoly(ev) {
    window.qwc2.drawGeometry("Polygon", "Draw a polygon", function(result, crs) { console.log(result); console.log(crs); }, {
        borderColor: [0, 0, 255, 1],
        size: 2,
        fillColor: [255, 255, 255, 0.5]
    });
}
function drawcircle(ev) {
    window.qwc2.drawGeometry("Circle", "Draw a circle", function(result, crs) { console.log(result); console.log(crs); }, {
        borderColor: [0, 0, 255, 1],
        size: 2,
        fillColor: [255, 255, 255, 0.5]
    });
}
function drawbox(ev) {
    window.qwc2.drawGeometry("Box", "Draw a box", function(result, crs) { console.log(result); console.log(crs); }, {
        borderColor: [0, 0, 255, 1],
        size: 2,
        fillColor: [255, 255, 255, 0.5]
    });
}

function toggleapidemo(ev) {
    // let apidemo = document.getElementById("apidemo");
    // apidemo.style.display = apidemo.style.display ? "" : "none";
    let navigation = document.querySelector(".navigation");
    navigation.classList.toggle("active");
}

window.onload = function() {
    let apiFrame = document.createElement("div");
    apiFrame.className = "navigation"

    apiFrame.innerHTML = `
        <div class="userBx">
            <p class="username">ToolBox</p>
        </div>
        <div class="menuToggle" onclick='toggleapidemo(event)'></div>
        <ul class="menu">
            <li>
                <a>Add</a>
                <button onclick='addmarker(event)'>Add marker</button>
                <button onclick='addpoly(event)'>Add poly</button>
            </li>
            <li>
                <a>Remove</a>
                <button onclick='removemarker(event)'>Remove marker</button>
                <button onclick='removepoly(event)'>Remove poly</button>
                <button onclick='removeall(event)'>Remove all</button>
            </li>
            <li>
                <a>Draw</a>
                <button onclick='drawpoint(event)'>Draw point</button>
                <button onclick='drawline(event)'>Draw line</button>
                <button onclick='drawpoly(event)'>Draw poly</button>
                <button onclick='drawcircle(event)'>Draw circle</button>
                <button onclick='drawbox(event)'>Draw box</button>
            </li>
            <li>
                <a>Settings</a>
                <button onclick='pantohb(event)'>Pan to HB</button>
                <button onclick='zoomtohb(event)'>Zoom to HB</button>
            </li>
        </ul>
        </div>
        </div>`;
    document.body.appendChild(apiFrame);
};
