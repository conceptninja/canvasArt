# canvasArt
3D Canvas wall art, built using CSS3 and Javascript

<a target="_blank" href="https://conceptninja.co.za/canvasArt/">Click here for a demo</a>

## Usage

### Initialization
```javascript

import { ArtCanvas } from './artCanvas.js';
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
```

<table class="explanationTable">
        <thead>
            <tr>
                <th>Option</th>
                <th>Default value</th>
                <th>Possible value</th>
                <th>Description</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td class="option">mouseMove</td>
                <td class="default_value">false</td>
                <td class="possible_values">true/false</td>
                <td class="description">Enables sideways click and drag action with the mouse.</td>
            </tr>
            <tr>
                <td class="option">externalStyleSheet</td>
                <td class="default_value">true</td>
                <td class="possible_values">true/false</td>
                <td class="description">If false, you do NOT need to load the .css file, the required styles will be loaded automatically.</td>
            </tr>
            <tr>
                <td class="option">canvasTexture</td>
                <td class="default_value">false</td>
                <td class="possible_values">true/false</td>
                <td class="description">Further enhances the Canvas look by applying a realistic overlay texture to the image.</td>
            </tr>
            <tr>
                <td class="option">canvasTextureImage</td>
                <td class="default_value">canvas-min.jpg</td>
                <td class="possible_values">eg. 'https://www.mypictures.com/canvasImage.jpg'</td>
                <td class="description">Enables you to specify the overlay texture that is applied onto the image. If left blank the default image in the repo will be used.</td>
            </tr>
            <tr>
                <td class="option">columns</td>
                <td class="default_value">3</td>
                <td class="possible_values">[Any integer value greater than 0]</td>
                <td class="description">Specify the amount of columns you want your art pieces spread over. The rows will be calculated automatically.</td>
            </tr>
            <tr>
                <td class="option">imageOffsetTop</td>
                <td class="default_value">0</td>
                <td class="possible_values">[Any integer value]</td>
                <td class="description">Fine tune where you'd like the image to start from the top, can be positive or negative values</td>
            </tr>
            <tr>
                <td class="option">imageOffsetLeft</td>
                <td class="default_value">0</td>
                <td class="possible_values">[Any integer value]</td>
                <td class="description">Fine tune where you'd like the image to start from the left, can be positive or negative values</td>
            </tr>
            <tr>
                <td class="option">link</td>
                <td class="default_value"><i>empty</i></td>
                <td class="possible_values">eg. 'https://www.google.com'</td>
                <td class="description">Specify a link if you want the art piece to link somewhere if it's set as type <i>single</i></td>
            </tr>
            <tr>
                <td class="option">externalLink</td>
                <td class="default_value">true</td>
                <td class="possible_values">true/false</td>
                <td class="description">Specify whether the link should open in a new window or not</td>
            </tr>
            <tr>
                <td class="option">startOffsetX</td>
                <td class="default_value">0</td>
                <td class="possible_values">[Any integer value]</td>
                <td class="description">X-axis offset in the 3D space of the canvas</td>
            </tr>
            <tr>
                <td class="option">startOffsetY</td>
                <td class="default_value">0</td>
                <td class="possible_values">[Any integer value]</td>
                <td class="description">Y-axis offset in the 3D space of the canvas</td>
            </tr>
            <tr>
                <td class="option">startOffsetZ</td>
                <td class="default_value">0</td>
                <td class="possible_values">[Any integer value]</td>
                <td class="description">Z-axis offset in the 3D space of the canvas</td>
            </tr>
            <tr>
                <td class="option">containerID</td>
                <td class="default_value">canvasWrapper</td>
                <td class="possible_values">'Target_div_element_ID'</td>
                <td class="description">ID of container div to load the canvas in</td>
            </tr>
            <tr>
                <td class="option">perspectiveStart</td>
                <td class="default_value">left</td>
                <td class="possible_values">'[left/right]'</td>
                <td class="description">Which side to start the perspective from</td>
            </tr>
            <tr>
                <td class="option">units</td>
                <td class="default_value">vmin</td>
                <td class="possible_values">'[vmin/vw/px/rem/em]'</td>
                <td class="description">What units of measure to use for the canvas elements</td>
            </tr>
            <tr>
                <td class="option">perspectiveLength</td>
                <td class="default_value">125vmin</td>
                <td class="possible_values">[Any value along with a unit of measure]</td>
                <td class="description">Changes the length of the rendered perspective</td>
            </tr>
            <tr>
                <td class="option">mode</td>
                <td class="default_value">single</td>
                <td class="possible_values">single / multi</td>
                <td class="description">Choose 'single' to show one image spread over multiple canvas elements, or 'multi' to show a separate image per canvas element</td>
            </tr>
            <tr>
                <td class="option">singleImageWidth</td>
                <td class="default_value">200</td>
                <td class="possible_values">[Any integer value]</td>
                <td class="description">The size to spread out the image horizontally (if in 'single' mode), the height will be calculated by the aspect ratio value</td>
            </tr>
            <tr>
                <td class="option">singleImageRatio</td>
                <td class="default_value">'16x9'</td>
                <td class="possible_values">eg. '16x9'/'4x3'/'1x1'/'9x16'</td>
                <td class="description">The image ratio to calculate the height by</td>
            </tr>
            <tr>
                <td class="option">marginAffectsPos</td>
                <td class="default_value">true</td>
                <td class="possible_values">true/false</td>
                <td class="description">Controls how the image is rendered, in regard to margins, over the canvas elements</td>
            </tr>
            <tr>
                <td class="option">singleImage</td>
                <td class="default_value"></td>
                <td class="possible_values">'URL_of_image'</td>
                <td class="description">The URL or path to an image to spread over the entire canvas collection if in 'single' mode</td>
            </tr>
            <tr>
                <td class="option">layout</td>
                <td class="default_value">defaultLayout</td>
                <td class="possible_values"><i>see below for layout example and explanation</i></td>
                <td class="description">The layout of the canvas items, please see below for the default layout used</td>
            </tr>
            <tr>
                <td colspan="4" class="noPad">
                    <pre class="codeBlock"><h3 style="color: #fff; margin: 20px 0 0 66px;">Layout example:</h3><code class="language-javascript">
        const defaultLayout: [
            [
                {
                    cols: 1,                        // Specify the number of columns this element should occupy
                    rows: 1,                        // Specify the number of rows this element should occupy
                    items: [{
                        imageOffsetLeft:-20,        // Fine tune where you'd like the image to start from the left, can be positive or negative values
                        imageOffsetTop:-20,         // Fine tune where you'd like the image to start from the Top, can be positive or negative values
                        margin:'20 7 7',            // Specify the margin (follows CSS rules) around the item (the units of measure specified in the constructor will be used)
                        height:'90',                // Set the height of the element (the units of measure specified in the constructor will be used)
                        width:'40',                 // Set the width of the element (the units of measure specified in the constructor will be used)
                        depth:'5'                   // Set the depth of the element (the units of measure specified in the constructor will be used)
                        link:'https:www.link.com'   // If in 'multi' mode, each element can link to it's own destination.
                        image:'images/demo.jpg'     // If in 'multi' mode, each element requires it's own image URL/path.
                    }],
                }
            ],
            [{cols: 1, rows: 1, items: [{margin: '7', height: '120', width: '55', depth: '8'}]}],
            [{cols: 1, rows: 1, items: [{margin: '20 7 7 7', height: '90', width: '40', depth: '5'}]}]
        ];
    </code></pre>
                </td>
            </tr>
        </tbody>
    </table>
