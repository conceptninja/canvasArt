import { ArtCanvas } from './artCanvas.js';

function initWall() {

    const canvas = new ArtCanvas({
        containerID: 'containerA',
        perspectiveStart: 'left',
        units: 'vmin',
        perspectiveLength: '125vmin',
        mode: 'single',
        singleImageWidth: '200',
        singleImageRatio: '1x1',
        marginAffectsPos: true,
        mouseMove: true,
        columns:4,
        startOffsetZ:-105,
        startOffsetX:30,
        startOffsetY:-19,
        singleImage: IMAGE_URLS[5],
        canvasTexture:true,
        canvasTextureImage:'images/canvas-min.jpg',
        layout: [
            [{cols: 3, rows: 1, items: [{margin: '3.5', height:'40', width:'127', depth:'10'}],}],
            [{cols: 1, rows: 3, items: [{imageOffsetLeft:7, margin: '3.5', height: '127', width: '40', depth: '10'}]}],
            [{cols: 1, rows: 3, items: [{margin: '3.5', height: '127', width: '40', depth: '10'}]}],
            [{cols: 2, rows: 2, items: [{margin: '3.5', height: '80', width: '80', depth: '10'}]}],
            [{cols: 3, rows: 1, items: [{imageOffsetTop:4, margin: '3.5', height:'40', width:'127', depth:'10'}],}],
        ]
    });

    const canvas2 = new ArtCanvas({
        containerID: 'containerB',
        perspectiveStart: 'right',
        units: 'vmin',
        perspectiveLength: '125vmin',
        mode: 'single',
        singleImageWidth: '140',
        singleImageRatio: '9x16',
        marginAffectsPos: true,
        columns:3,
        mouseMove: true,
        startOffsetZ:-105,
        startOffsetX:-30,
        startOffsetY:-29,
        singleImage: IMAGE_URLS[1],
        canvasTexture:true,
        canvasTextureImage:'images/canvas-min.jpg',
        layout: [
            [{cols: 1, rows: 2, items: [{margin:'2 3.5', height:'100', width:'36', depth:'10'}],}],
            [{cols: 2, rows: 1, items: [{margin:'2 3.5', height:'48', width:'72', depth:'10'}]}],
            [{cols: 2, rows: 1, items: [{margin:'2 3.5', height:'48', width:'72', depth:'10'}]}],
            [{cols: 2, rows: 1, items: [{margin:'2 3.5', height:'48', width:'72', depth:'10'}]}],
            [{cols: 1, rows: 2, items: [{imageOffsetLeft:7, margin:'2 3.5', height:'100', width:'36', depth:'10'}],}],
            [{cols: 2, rows: 1, items: [{margin:'2 3.5', height:'48', width:'72', depth:'10'}]}],
        ]
    });

    const canvas3 = new ArtCanvas({
        containerID: 'containerC',
        perspectiveStart: 'left',
        units: 'vmin',
        perspectiveLength: '125vmin',
        mode: 'single',
        singleImageWidth: '250',
        singleImageRatio: '16x9',
        marginAffectsPos: true,
        columns:4,
        mouseMove: true,
        startOffsetZ:-60,
        startOffsetY:-4,
        startOffsetX:20,
        singleImage: IMAGE_URLS[0],
        canvasTexture:true,
        canvasTextureImage:'images/canvas-min.jpg',
        layout: [
            [{cols: 1, rows: 2, items: [{margin:'2 3.5', height:'72', width:'48', depth:'10'}],}],
            [{cols: 1, rows: 2, items: [{margin:'2 3.5', height:'72', width:'48', depth:'10'}]}],
            [{cols: 2, rows: 1, items: [{margin:'2 3.5', height:'36', width:'103', depth:'10'}]}],
            [{cols: 1, rows: 2, items: [{margin:'2 3.5', height:'72', width:'48', depth:'10'}],}],
            [{cols: 1, rows: 2, items: [{margin:'2 3.5', height:'72', width:'48', depth:'10'}]}],
            [{cols: 2, rows: 1, items: [{imageOffsetTop:7, margin:'2 3.5', height:'36', width:'103', depth:'10'}]}],
        ]
    });

    const canvas4 = new ArtCanvas({
        containerID: 'containerD',
        perspectiveStart: 'right',
        units: 'vmin',
        perspectiveLength: '125vmin',
        mode: 'multi',
        singleImageWidth: '170',
        singleImageRatio: '16x9',
        mouseMove: true,
        columns:3,
        startOffsetZ:-65,
        layout: [
            [{cols: 1, rows: 1, items: [{margin:'6', height:'80', width:'40', depth:'8', image:IMAGE_URLS[2]}],}],
            [{cols: 1, rows: 1, items: [{margin: '6', height: '80', width: '40', depth: '8', image:IMAGE_URLS[3]}]}],
            [{cols: 1, rows: 1, items: [{margin: '16 6 5 6', height: '60', width: '40', depth: '8', image:IMAGE_URLS[4]}]}],
            [{cols: 2, rows: 1, items: [{margin: '6', height: '40', width: '80', depth: '8', image:IMAGE_URLS[7]}]}],
            [{cols: 1, rows: 1,items: [{margin: '6', height: '40', width: '40', depth: '8', image:IMAGE_URLS[6]}]}]
        ]
    });

    const canvas5 = new ArtCanvas({
        containerID: 'containerE',
        mode: 'multi',
        perspectiveStart: 'left',
        mouseMove: true,
        columns: 4,
        startOffsetZ:-65,
        startOffsetY:(window.innerWidth > 720) ? -4 : 30,
        startOffsetX:24,
        layout: [
            [{cols: 1, rows: 1, items: [{margin: '3 4', height: '38', width: '60', depth: '7',  image:IMAGE_URLS[8]}]}],
            [{cols: 1, rows: 1, items: [{margin: '3 4', height: '38', width: '60', depth: '7',  image:IMAGE_URLS[9]}]}],
            [{cols: 2, rows: 2, items: [{margin: '3 4', height: '82', width: '128', depth: '7', image:IMAGE_URLS[10]}]}],
            [{cols: 1, rows: 1, items: [{margin: '3 4', height: '38', width: '60', depth: '7',  image:IMAGE_URLS[11]}]}],
            [{cols: 1, rows: 1, items: [{margin: '3 4', height: '38', width: '60', depth: '7',  image:IMAGE_URLS[12]}]}],
            [{cols: 1, rows: 1, items: [{margin: '3 4', height: '38', width: '60', depth: '7',  image:IMAGE_URLS[13]}]}],
            [{cols: 1, rows: 1, items: [{margin: '3 4', height: '38', width: '60', depth: '7',  image:IMAGE_URLS[14]}]}],
            [{cols: 1, rows: 1, items: [{margin: '3 4', height: '38', width: '60', depth: '7',  image:IMAGE_URLS[15]}]}],
            [{cols: 1, rows: 1, items: [{margin: '3 4', height: '38', width: '60', depth: '7',  image:IMAGE_URLS[16]}]}],
        ]
    });
}

$(document).ready(function() {
    initWall();
});