/**
 * Author: Martin Nel
 * Website: https://conceptninja.co.za
 * Version: 1.0
 *
 * Configuration defaults:
 * const options = {
 *     mouseMove:          false,                               // (true/false) --> Slide the canvas left and right with the mouse
 *     canvasTexture:      false,                               // (true/false) --> Apply a canvas texture to your images. Could be expensive on old devices?
 *     columns:            3,                                   // The column count of the art wall
 *     imageOffsetTop:     0,                                   // Fine tune where you'd like the image to start from the top, can be positive or negative values
 *     imageOffsetLeft:    0,                                   // Fine tune where you'd like the image to start from the left, can be positive or negative values
 *     link:               '',                                  // Specify a link if you want the art piece to link somewhere
 *     externalLink:       true,                                // Whether the above link will open a new window or open in the same window
 *     startOffsetX:       0,                                   // X-axis offset in the 3D space of the canvas
 *     startOffsetY:       0,                                   // Y-axis offset in the 3D space of the canvas
 *     startOffsetZ:       0,                                   // Z-axis offset in the 3D space of the canvas
 *     containerID:        'canvasContainer',                   // ID of container div to load the canvas in
 *     perspectiveStart:   'left',                              // (right/left) --> Which side to start the perspective from
 *     units:              'vmin',                              // (vmin,vw,px,rem,em) --> Which unit measure to use for the canvas system
 *     perspectiveLength:  '125vmin',                           // Changes the length of the perspective
 *     mode:               'single',                            // (multi/single) --> 'multi' displays as image on each element separately, 'single' displays a single image spread over all elements
 *     singleImageWidth:   '200',                               // The size to spread out the image vertically
 *     marginAffectsPos:   true,                                // (true/false) --> Take margins into account when spreading out the image?
 *     singleImage:        'https://tinyurl.com/5n8txpfp',      // URL if single image mode is selected
 *     layout:             defaultLayout,                       // The layout of the items, please see below for the default layout used
 * };
 *
 * const defaultLayout: [
 *     [{cols: 1, rows: 1, items: [{imageOffsetLeft:-20, margin:'20 7 7', height:'90', width:'40', depth:'5'}],}],
 *     [{cols: 1, rows: 1, items: [{margin: '7', height: '120', width: '55', depth: '8'}]}],
 *     [{cols: 1, rows: 1, items: [{margin: '20 7 7 7', height: '90', width: '40', depth: '5'}]}]
 * ];
 */

class ArtCanvas {

    constructor(options) {
        const defaultLayout = [
            [{cols: 1, rows: 1, items: [{margin:'20 7 7', height:'70', width:'40', depth:'5'}],}],
            [{cols: 1, rows: 1, items: [{margin: '7', height: '100', width: '60', depth: '8'}]}],
            [{cols: 1, rows: 1, items: [{margin: '20 7 7 7', height: '70', width: '40', depth: '5'}]}]
        ];

        this.options = {
            rows:               10,
            totRows:            1,
            biggestMargin:      0,
            biggestSideMargin:  0,
            mouseMove:          (typeof options.mouseMove !== 'undefined') ? options.mouseMove : false,
            externalStyleSheet: (typeof options.externalStyleSheet !== 'undefined') ? options.externalStyleSheet : true,
            canvasTexture:      (typeof options.canvasTexture !== 'undefined') ? options.canvasTexture : false,
            canvasTextureImage: (typeof options.canvasTextureImage !== 'undefined') ? options.canvasTextureImage : 'canvas-min.jpg',
            columns:            (typeof options.columns !== 'undefined') ? options.columns : 3,
            imageOffsetTop:     (typeof options.imageOffsetTop !== 'undefined') ? options.imageOffsetTop : 0,
            imageOffsetLeft:    (typeof options.imageOffsetLeft !== 'undefined') ? options.imageOffsetLeft : 0,
            link:               (typeof options.link !== 'undefined') ? options.link : '',
            externalLink:       (typeof options.externalLink !== 'undefined') ? options.externalLink : true,
            startOffsetX:       (typeof options.startOffsetX !== 'undefined') ? options.startOffsetX : 0,
            startOffsetY:       (typeof options.startOffsetY !== 'undefined') ? options.startOffsetY : 0,
            startOffsetZ:       (typeof options.startOffsetZ !== 'undefined') ? options.startOffsetZ : 0,
            rowColumnSizes:     {widest:0, highest:0, totalWidth:0, totalHeight:0},
            containerID:        (typeof options.containerID !== 'undefined') ? options.containerID : 'canvasWrapper',
            perspectiveStart:   (typeof options.perspectiveStart !== 'undefined') ? options.perspectiveStart : 'left',         // 'right' or 'left - (can also leave blank for left)'
            units:              (typeof options.units !== 'undefined') ? options.units : 'vmin',
            perspectiveLength:  (typeof options.perspectiveLength !== 'undefined') ? options.perspectiveLength : '125vmin',
            mode:               (typeof options.mode !== 'undefined') ? options.mode : 'single',                               // 'multi' or 'single'
            singleImageWidth:   (typeof options.singleImageWidth !== 'undefined') ? options.singleImageWidth : '200',
            singleImageHeight:  (typeof options.singleImageHeight !== 'undefined') ? options.singleImageHeight : null,
            singleImageRatio:   (typeof options.singleImageRatio !== 'undefined') ? options.singleImageRatio : '16x9',
            marginAffectsPos:   (typeof options.marginAffectsPos !== 'undefined') ? options.marginAffectsPos : true,
            singleImage:        (typeof options.singleImage !== 'undefined') ? options.singleImage : 'https://images.squarespace-cdn.com/content/v1/54650fd6e4b0c770ae94d319/1470345846569-UQREUY1WEFOECGQDNDZE/image-asset.jpeg',
            layout:             (typeof options.layout !== 'undefined') ? options.layout : defaultLayout,
        };

        if(this.options.singleImageHeight === null && this.options.mode === 'single') {
            let ratio = this.options.singleImageRatio.split('x');
            this.options.singleImageHeight = (parseInt(ratio[1])/parseInt(ratio[0]))*parseInt(this.options.singleImageWidth);
        }

        if(this.options.mode === 'single') this.getAvailability();
        this.addStyle(this.checkStyle());
        this.addUniqueStyle(this.options.containerID);
        this.init();
    }

    checkStyle() {
        if(!this.options.externalStyleSheet)
            return (this.options.mode === 'single') ? this.addStyleMulti() : this.addStyleMulti();
        else
            return this.addBasicStyle();
    }

    available(gridMatrix, rowCol) {
        if(typeof gridMatrix[rowCol] !== 'undefined')
            if(!gridMatrix[rowCol].occupied)
                return true;
    }

    getAvailability() {
        let currentItem;
        let gridMatrix = {};
        let offsets = {};

        let currentRowHeight = {};
        let numsInRow = {};

        for(let b=0; b<this.options.layout.length;b++) {
            currentItem = this.options.layout[b];
            offsets[b] = this.getNextAvailableSlot(currentItem[0], gridMatrix, b, currentRowHeight, numsInRow);
        }
    }

    getNextAvailableSlot(currentItem, gridMatrix, num, currentRowHeight, numsInRow) {

        let remainingCols;
        let currentPos = {col:0, row:0};

        loop1: for (let t = 0; t < this.options.rows; t++) {

            loop2: for (let s = 0; s < this.options.columns; s++) {
                remainingCols = this.options.columns - (s+1);

                currentPos.col = s;
                currentPos.row = t;

                let currentMatrix = [];

                loop3: for (let tt = 1; tt <= currentItem.rows; tt++) {
                    loop4: for (let ss = 1; ss <= currentItem.cols; ss++) {
                        currentMatrix.push((t+tt)+'x'+(s+ss));
                    }
                }

                let available = true;
                for(let g=0;g<currentMatrix.length;g++) {
                    if(typeof gridMatrix[currentMatrix[g]] !== 'undefined')
                        available = false;
                }

                if(available) {
                    for(let g=0;g<currentMatrix.length;g++) {
                        if(typeof currentMatrix[g] !== 'undefined')
                            gridMatrix[currentMatrix[g]] = 1;
                    }

                    currentItem.items.forEach(params => {
                        if(currentItem.cols === 1)
                            this.options.rowColumnSizes.widest = Math.max(this.options.rowColumnSizes.widest, params.width);

                        if(currentItem.rows === 1)
                            this.options.rowColumnSizes.highest = Math.max(this.options.rowColumnSizes.highest, params.height);

                        let margins = this.getMargins(params.margin);
                        let newHeight = (parseInt(params.height)-((parseInt(margins.marginTop)+parseInt(margins.marginBottom))*(currentItem.rows)))/currentItem.rows;

                        this.options.biggestMargin = Math.max(this.options.biggestMargin, (parseInt(margins.marginTop)+parseInt(margins.marginBottom)));
                        this.options.biggestSideMargin = Math.max(this.options.biggestSideMargin, (parseInt(margins.marginLeft)+parseInt(margins.marginRight)));

                        if(typeof currentRowHeight[t] !== 'undefined')
                            currentRowHeight[t] = Math.max(currentRowHeight[t], newHeight);
                        else
                            currentRowHeight[t] = Math.max(0, newHeight);

                        if(typeof numsInRow[t] !== 'undefined')
                            numsInRow[t].push(num);
                        else
                            numsInRow[t] = [num];

                        params.bgStartLeft = currentPos.col;
                        params.bgStartTop = currentPos.row;
                        params.bgOffset = 0;
                        //console.log(params);

                        this.updateHeights(currentRowHeight[t], numsInRow[t]);
                        this.updateColsInRow(s, numsInRow[t]);
                    });

                    this.options.rowColumnSizes.totalWidth = this.options.columns * this.options.rowColumnSizes.widest;
                    this.options.totRows = Math.max(this.options.totRows, t+1);

                    break loop1;
                }
            }
        }

        return currentPos;
    }

    getMargins(margins) {
        let margin = (typeof margins !== 'undefined') ? margins.split(" ") : 0;
        let marginTop, marginLeft, marginBottom, marginRight;
        if(margin !== 0) {
            switch(margin.length) {
                case 1 : marginTop = margin[0]; marginRight = margin[0]; marginBottom = margin[0]; marginLeft = margin[0]; break;
                case 2 : marginTop = margin[0]; marginRight = margin[1]; marginBottom = margin[0]; marginLeft = margin[1]; break;
                case 3 : marginTop = margin[0]; marginRight = margin[1]; marginBottom = margin[2]; marginLeft = margin[1]; break;
                case 4 : marginTop = margin[0]; marginRight = margin[1]; marginBottom = margin[2]; marginLeft = margin[3]; break;
                default : marginTop = margin[0]; marginRight = margin[0]; marginBottom = margin[0]; marginLeft = margin[0]; break;
            }

            margin = marginTop+this.options.units+' '+marginRight+this.options.units+' '+marginBottom+this.options.units+' '+marginLeft+this.options.units;
        }

        return { 'marginTop':marginTop, 'marginRight':marginRight, 'marginBottom':marginBottom, 'marginLeft':marginLeft, margin:margin };
    }

    updateHeights(currentRowHeight, numsInRow) {
        for(let b=0; b<numsInRow.length;b++) {
            let item = this.options.layout[numsInRow[b]][0];
            item.items.forEach(params => {
                params.rowHeight = currentRowHeight;
            });
        }
    }

    updateColsInRow(cols, numsInRow) {
        for(let b=0; b<numsInRow.length;b++) {
            let item = this.options.layout[numsInRow[b]][0];
            item.items.forEach(params => {
                params.colsInRow = cols;
            });
        }
    }

    addUniqueStyle(container) {
        let offsetX = this.options.columns*13;
        let offsetY = -8;
        let offsetZ = -50;
        let autoSize = [];

        if(this.options.perspectiveStart === 'right')
            offsetX *= -1;

        if(this.options.startOffsetX !== 0)
            offsetX = this.options.startOffsetX;

        if(this.options.startOffsetY !== 0)
            offsetY = this.options.startOffsetY;

        if(this.options.startOffsetZ !== 0)
            offsetZ = this.options.startOffsetZ;

        for(let s=0;s<this.options.columns;s++)
            autoSize.push('auto');

        const styleString = `
#`+container+` {
    overflow:hidden;
}
#`+container+`.canvasContainer {
    perspective: `+this.options.perspectiveLength+`;
}
#`+container+` .grid-layout {
    grid-template-columns: `+autoSize.join(' ')+`;
}
#`+container+` .grid-layout {
    transform: rotate3d(0, 1, 0, 27deg) translateX(`+offsetX+`vw) translateZ(`+offsetZ+`vw) translateY(`+offsetY+`vw);
}
#`+container+`.right .grid-layout {
    transform: rotate3d(0, 1, 0, -27deg) translateX(`+offsetX+`vw) translateZ(`+offsetZ+`vw) translateY(`+offsetY+`vw);
}
#`+container+`.canvasContainer .front.canvasTexture::after,
#`+container+`.canvasContainer .top.canvasTexture::after,
#`+container+`.canvasContainer .bottom.canvasTexture::after,
#`+container+`.canvasContainer .right.canvasTexture::after,
#`+container+`.canvasContainer .left.canvasTexture::after {
    background-image: url('`+((this.options.canvasTexture) ? this.options.canvasTextureImage : '')+`');
}
        `;

        const style = document.createElement('style');
        style.textContent = styleString;
        document.head.append(style);
    }

    addStyle(styleString) {
        const checkLoaded = document.getElementById('canvasStyle');
        if(checkLoaded === null) {
            const style = document.createElement('style');
            style.id = 'canvasStyle';
            style.textContent = styleString;
            document.head.append(style);
        }
    }

    addBasicStyle() {
        return `
.canvasContainer {
    perspective: `+this.options.perspectiveLength+`;
}
.grid-layout {
    grid-template-columns: repeat(`+this.options.columns+`, 1fr);
}
`;
    }

    addStyleSingle() {
        return `
.canvasContainer {
    width: 100%;
    height: 100vh;
    perspective: `+this.options.perspectiveLength+`;
}
.canvasContainer.right {
    margin-left: auto;
}
.canvasContainer .cube {
    position: relative;
    width: var(--w);
    height: var(--h);
    transform-style: preserve-3d;
    box-shadow:-1vw 1vw 1vw rgb(0 0 0 / 75%);
    cursor: pointer;
    margin: var(--m);
}
.canvasContainer .face {
    background-position: center;
    width: var(--w);
    height: var(--h);
    --mid: calc(var(--w)/2);
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: Arial, sans-serif;
    font-size: 2rem;
    transition: transform 500ms;
    filter:saturate(60%);
}
.artLink {
    transform-style: preserve-3d;
    display:block;
}
.canvasContainer .front {
    transform: translateZ(var(--d));
}
.canvasContainer .front.canvasTexture::after,
.canvasContainer .left.canvasTexture::after,
.canvasContainer .right.canvasTexture::after,
.canvasContainer .top.canvasTexture::after,
.canvasContainer .bottom.canvasTexture::after {
    content: " ";
    mix-blend-mode: multiply;
    display: block;
    height: 100%;
    width: 100%;
    opacity: .7;
}
.canvasContainer .cube:hover .front {
    filter:saturate(100%);
}
.canvasContainer .back {
    transform: translateZ(0) rotateY(180deg);
    background: #4a4a4a;
}
.canvasContainer .left {
    width: var(--d);
    transform: translateX(calc(var(--d)/2*-1)) translateZ(calc(var(--d)/2)) rotateY(-90deg);
    background-position:calc(50% + (var(--d)/2 + var(--w)/2)) center;
    filter: brightness(0.4) saturate(60%);
}
.canvasContainer .cube:hover .left {
    filter:brightness(0.4) saturate(100%);
}
.canvasContainer .right {
    width: var(--d);
    transform: translateX(calc(var(--w) - var(--d)/2)) translateZ(calc(var(--d)/2)) rotateY(90deg);
    background-position:calc(50% - (var(--d)/2 + var(--w)/2)) center;
    filter: brightness(0.4) saturate(60%);
}
.canvasContainer .cube:hover .right {
    filter:brightness(0.4) saturate(100%);
}
.canvasContainer .top {
    height: var(--d);
    transform: translateY(calc(var(--d)/2*-1)) translateZ(calc(var(--d)/2)) rotateX(90deg);
    background-position:center calc(50% + (var(--d)/2 + var(--h)/2));
}
.canvasContainer .cube:hover .top {
    filter:saturate(100%);
}
.canvasContainer .bottom {
    height: var(--d);
    transform: translateY(calc(var(--h) - var(--d)/2)) translateZ(calc(var(--d)/2)) rotateX(-90deg);
    filter: brightness(0.2) saturate(60%);
    background-position:center calc(50% - (var(--d)/2 + var(--h)/2));
}
.canvasContainer .cube:hover .bottom {
    filter:brightness(0.2) saturate(100%);
}
.grid-layout {
    width: min-content;
    display: grid;
    grid-template-columns: repeat(`+this.options.columns+`, 1fr);
    grid-auto-flow: dense;
    transform-style: preserve-3d;
    transform-origin: center;
}
.canvasContainer.right .grid-layout {
    margin-left: auto;
}
@media (max-width: 720px) {
    .grid-layout {
        transform: rotate3d(0, 1, 0, 27deg) translateX(24vw) translateZ(-77vw) translateY(-8vw);
    }
    .canvasContainer.right .grid-layout {
        transform: rotate3d(0, 1, 0, -27deg) translateX(-70vw) translateZ(-37vw) translateY(-8vw);
    }
}
.grid-layout .right {
    /*display: none;*/
}
.canvasContainer.right .left {
    /*display: none;*/
}
.canvasContainer.right .right {
    display: block;
}
.canvasContainer.right .grid-layout .cube {
    box-shadow: 1vw 1vw 1.5vw rgb(0 0 0 / 75%);
}
.canvasContainer .cube:hover, .canvasContainer.right .cube:hover {
    box-shadow:0 0 12vmin #5fc6fd;
}
.grid-item {
    transform-style: preserve-3d;
}
.span-2-col {
    grid-column-end: span 2;
}
.span-2-row {
    grid-row-end: span 2;
}
.span-3-col {
    grid-column-end: span 3;
}
.span-3-row {
    grid-row-end: span 3;
}
.span-4-col {
    grid-column-end: span 4;
}
.span-4-row {
    grid-row-end: span 4;
}
.span-5-col {
    grid-column-end: span 5;
}
.span-5-row {
    grid-row-end: span 5;
}            
        `;
    }

    addStyleMulti() {
        return this.addStyleSingle();
    }

    init() {

        this.moveContainer = false;

        // Get parent container div
        const parentContainer = document.getElementById(this.options.containerID);
        parentContainer.className = 'canvasContainer ' + ((typeof this.options.perspectiveStart !== 'undefined') ? this.options.perspectiveStart : '');

        // Create child perspective'd container grid
        const canvasDiv = document.createElement("div");
        const newID = 'canvasDiv-'+Date.now()+'-'+Math.floor(Math.random() * 101);
        canvasDiv.id = newID;
        canvasDiv.className = 'grid-layout';

        if(this.options.mouseMove)
            this.events(parentContainer, canvasDiv);

        // Add child container to parent
        parentContainer.append(canvasDiv);

        // Loop through grid items
        this.options.layout.forEach(item => {
            this.addCanvas(item[0], newID);
        });
    }

    events(parentContainer, canvasDiv) {

        let offsetX = this.options.columns*13;
        if(this.options.perspectiveStart === 'right')
            offsetX *= -1;

        let offsetY = -8, offsetZ = -50;

        if(this.options.startOffsetX !== 0)
            offsetX = parseInt(this.options.startOffsetX);

        if(this.options.startOffsetY !== 0)
            offsetY = parseInt(this.options.startOffsetY);

        if(this.options.startOffsetZ !== 0)
            offsetZ = parseInt(this.options.startOffsetZ);

        let that = this;
        this.startX = 0;
        this.lastTouch = 0;
        that.lastX = ((that.options.perspectiveStart === 'right')) ? -(this.options.columns*13) : (this.options.columns*13);

        parentContainer.addEventListener('pointerdown', function(e) {
            if(!that.moveContainer) {
                that.enableContainerMove(that);
                that.startX = e.x;
            }
        });
        parentContainer.addEventListener('touchstart', function(e) {
            if(!that.moveContainer) {
                that.enableContainerMove(that);
                that.startX = e.touches[0].clientX;
            }
        });
        window.addEventListener('pointerup', function(e) {
            that.disableContainerMove(that);
            that.lastTouch = that.lastX;
        });
        window.addEventListener('touchend', function(e) {
            that.disableContainerMove(that);
            that.lastTouch = that.lastX;
        });
        window.addEventListener('pointermove', function(e) {
            e.preventDefault();
            that.makeMove(that, canvasDiv, e.x, offsetX, offsetY, offsetZ);
        });
        window.addEventListener('touchmove', function(e) {
            e.preventDefault();
            that.makeMove(that, canvasDiv, e.touches[0].clientX, offsetX, offsetY, offsetZ);
        });
    }

    makeMove(that, canvasDiv, x, offsetX, offsetY, offsetZ) {
        if(that.moveContainer) {
            that.lastX = (x-that.startX)+that.lastTouch;

            if(that.options.perspectiveStart === 'right')
                canvasDiv.style.transform = "rotate3d(0, 1, 0, -27deg) translateX(calc("+(that.lastX)+"px + "+(offsetX)+"vw)) translateZ("+(offsetZ)+"vw) translateY("+(offsetY)+"vw)";
            else
                canvasDiv.style.transform = "rotate3d(0, 1, 0, 27deg) translateX(calc("+(that.lastX)+"px + "+(offsetX)+"vw)) translateZ("+(offsetZ)+"vw) translateY("+(offsetY)+"vw)";
        }
    }

    clamp(num, min, max) {
        return Math.min(Math.max(num, min), max);
    }

    disableContainerMove(that) {
        that.moveContainer = false;
    }

    enableContainerMove(that) {
        that.moveContainer = true;
    }

    addCanvas(canvas, newID) {
        // create a new div element
        const canvasDiv = document.createElement("div");
        canvasDiv.className = 'grid-item ' + ((canvas.cols > 1) ? 'span-'+canvas.cols+'-col ' : '') + ((canvas.rows > 1) ? 'span-'+canvas.rows+'-row' : '');

        canvas.items.forEach(options => {
            canvasDiv.innerHTML += this.innerCanvas('square', options);
        });

        // add the newly created element and its content into the DOM
        const currentDiv = document.getElementById(newID);
        currentDiv.append(canvasDiv);
    }

    innerCanvas(extraClass='', options={}) {
        const width = (typeof options.width !== 'undefined') ? options.width+this.options.units : '40'+this.options.units;
        const height = (typeof options.height !== 'undefined') ? options.height+this.options.units : '40'+this.options.units;
        const depth = (typeof options.depth !== 'undefined') ? options.depth+this.options.units : '4'+this.options.units;

        let marginLeftModifier = 0, marginTopModifier = 0;
        let newMargins = this.getMargins(options.margin);

        const bgImage = (this.options.mode === 'multi') ? options.image : this.options.singleImage;
        const bg = (bgImage !== '') ? "background-image: url('"+bgImage+"');" : '';

        let bgSizePos = '';
        let bgSizePosFront = '',
            bgSizePosLeft = '',
            bgSizePosRight = '',
            bgSizePosTop = '',
            bgSizePosBottom = '';

        let imageOffsetTop = 0;
        let imageOffsetLeft = 0;

        if(this.options.mode === 'single') {

            imageOffsetTop = this.options.imageOffsetTop;
            imageOffsetLeft = this.options.imageOffsetLeft;

            if(typeof options.imageOffsetTop !== 'undefined') imageOffsetTop += options.imageOffsetTop;
            if(typeof options.imageOffsetLeft !== 'undefined') imageOffsetLeft += options.imageOffsetLeft;

            if(typeof options.bgStartLeft !== 'undefined' && this.options.marginAffectsPos) marginLeftModifier = parseInt(newMargins.marginLeft)+(parseInt(newMargins.marginRight)*options.bgStartLeft);
            if(typeof options.bgStartTop !== 'undefined' && this.options.marginAffectsPos) marginTopModifier = parseInt(newMargins.marginTop)+(parseInt(newMargins.marginTop)*options.bgStartTop);

            // Common background properties
            bgSizePos = 'background-size: '+this.options.singleImageWidth+this.options.units+' '+this.options.singleImageHeight+this.options.units+';';

            let calcedWidth = (this.options.rowColumnSizes.widest*this.options.columns)+((this.options.columns-1)*this.options.biggestSideMargin);
            let leftStart = calcedWidth-(options.bgStartLeft)*(calcedWidth/this.options.columns);
            leftStart -= calcedWidth;
            leftStart -= marginLeftModifier;
            leftStart += imageOffsetLeft;

            let calcedHeight = (this.options.rowColumnSizes.highest*this.options.totRows)+((this.options.totRows-1)*this.options.biggestMargin);
            let topStart = calcedHeight-(options.bgStartTop)*(calcedHeight/this.options.totRows);
            topStart -= calcedHeight;
            topStart -= marginTopModifier;
            topStart += imageOffsetTop;

            bgSizePosFront = ' background-position: '+((leftStart-parseInt(options.depth))+this.options.units);
            bgSizePosFront += ' '+((topStart-parseInt(options.depth))+this.options.units)+';';

            bgSizePosLeft = ' background-position: '+((leftStart)+this.options.units);
            bgSizePosLeft += ' '+((topStart-parseInt(options.depth))+this.options.units)+';';

            bgSizePosRight = ' background-position: '+((leftStart-parseInt(options.depth)-parseInt(options.width))+this.options.units);
            bgSizePosRight += ' '+((topStart-parseInt(options.depth))+this.options.units)+';';

            bgSizePosTop = ' background-position: '+((leftStart-parseInt(options.depth))+this.options.units);
            bgSizePosTop += ' '+((topStart)+this.options.units)+';';

            bgSizePosBottom = ' background-position: '+((leftStart-parseInt(options.depth))+this.options.units);
            bgSizePosBottom += ' '+((topStart-parseInt(options.depth)-parseInt(options.height))+this.options.units)+';';

        } else if(this.options.mode === 'multi') {
            imageOffsetTop = (typeof options.imageOffsetTop !== 'undefined') ? options.imageOffsetTop : 0;
            imageOffsetLeft = (typeof options.imageOffsetLeft !== 'undefined') ? options.imageOffsetLeft : 0;

            bgSizePosFront = ' background-position: calc(50% + '+(imageOffsetLeft+this.options.units)+') calc(50% + '+(imageOffsetTop+this.options.units)+');';
            bgSizePosRight = ' background-position: calc(50% - (var(--d)/2 + var(--w)/2) + '+(imageOffsetLeft+this.options.units)+') calc(50% + '+(imageOffsetTop+this.options.units)+');';
            bgSizePosLeft = ' background-position: calc(50% + (var(--d)/2 + var(--w)/2) + '+(imageOffsetLeft+this.options.units)+') calc(50% + '+(imageOffsetTop+this.options.units)+');';
            bgSizePosTop = ' background-position: calc(50% + '+(imageOffsetLeft+this.options.units)+') calc(50% + (var(--d)/2 + var(--h)/2) + '+(imageOffsetTop+this.options.units)+');';
            bgSizePosBottom = ' background-position: calc(50% + '+(imageOffsetLeft+this.options.units)+') calc(50% - (var(--d)/2 + var(--h)/2) + '+(imageOffsetTop+this.options.units)+');';

            bgSizePos = 'background-size: '+(parseInt(options.width)+(parseInt(options.depth)*2))+this.options.units+' '+(parseInt(options.height)+(parseInt(options.depth)*2))+this.options.units+';';
        }

        const linkTargetSingle = (this.options.mode === 'single' && !this.options.externalLink) ? '' : 'target="_blank"';

        const link = (typeof options.link !== 'undefined' && options.link.trim() !== '') ? options.link : ((typeof this.options.link !== 'undefined' && this.options.link.trim() !== '') ? this.options.link : '');
        const linkPre = (link !== '') ? '<a class="artLink" '+linkTargetSingle+' href="'+link+'">' : '';
        const linkPost = (linkPre !== '') ? '</a>' : '';
        const canvasTexture = (this.options.canvasTexture) ? 'canvasTexture' : '';

//        return linkPre+`<div class="cube `+extraClass+`" style="--m: `+margin+`; --h: `+height+`; --w: `+width+`; --d: `+depth+`;">
        return linkPre+`<div data-colsinrow="`+((options.colsInRow) ? options.colsInRow : 0)+`" data-height="`+((options.rowHeight) ? options.rowHeight : 0)+`" data-startLeft="`+((typeof options.bgStartLeft !== 'undefined') ? options.bgStartLeft : 0)+`" data-startTop="`+((typeof options.bgStartTop !== 'undefined') ? options.bgStartTop : 0)+`" data-offset="`+((typeof options.bgOffset !== 'undefined') ? options.bgOffset : 0)+`" class="cube `+extraClass+`" style="--m: `+newMargins.margin+`; --h: `+height+`; --w: `+width+`; --d: `+depth+`;">
                        <div style="`+bg+` `+bgSizePos+` `+bgSizePosTop+`" class="face top `+canvasTexture+`"></div>
                        <div style="`+bg+` `+bgSizePos+` `+bgSizePosBottom+`" class="face bottom `+canvasTexture+`"></div>
                        <div style="`+bg+` `+bgSizePos+` `+bgSizePosRight+`" class="face right `+canvasTexture+`"></div>
                        <div style="`+bg+` `+bgSizePos+` `+bgSizePosLeft+`" class="face left `+canvasTexture+`"></div>
                        <div style="`+bg+` `+bgSizePos+` `+bgSizePosFront+`" class="face front `+canvasTexture+`"></div>
                        <div class="face back"></div>
                    </div>`+linkPost;
    }
}

export { ArtCanvas }