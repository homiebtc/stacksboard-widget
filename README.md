# Stacksboard Widget

[Demo](https://homiebtc.github.io/stacksboard-widget/)


This widget makes it easy to add a Stacksboard component to your website. Just add the following to your html: 

```html
<div className="stacksboard_widget"
    stacksboard-widget-contract="SP1F6E7S7SEZZ2R2VHCY0BYJ2G81CCSSJ7PC4SSHP.crashpunks-board-slot"
></div>

<script type="module" src="https://cdn.jsdelivr.net/gh/homiebtc/stacksboard-widget@1.0.13/build/dist/index.js"></script>

<link href="https://cdn.jsdelivr.net/gh/homiebtc/stacksboard-widget@1.0.13/build/dist/index.css" rel="stylesheet"/>
```

## Props

### `stacksboard-widget-contract` (required)
Equal to the contract ID. Ex: `SP1F6E7S7SEZZ2R2VHCY0BYJ2G81CCSSJ7PC4SSHP.crashpunks-board-slot`. You can find available board contracts at this address https://explorer.stacks.co/address/SP1F6E7S7SEZZ2R2VHCY0BYJ2G81CCSSJ7PC4SSHP?chain=mainnet. 

Example:
```html
<div className="stacksboard_widget"
    stacksboard-widget-contract="SP1F6E7S7SEZZ2R2VHCY0BYJ2G81CCSSJ7PC4SSHP.crashpunks-board-slot" ></div>
```

### `stacksboard-widget-board-size` (optional)
Available options: `'full' | 'half' | 'quarter' | null`. The board automatically resizes and picks an option based on the width of the application. If you specify an option here, it will override the automatic selection.

Example:
```html
<div class="stacksboard_widget" 
    stacksboard-widget-contract="SP1F6E7S7SEZZ2R2VHCY0BYJ2G81CCSSJ7PC4SSHP.crashpunks-board-slot"
    stacksboard-widget-board-size="half" ></div>
```

### `stacksboard-widget-board-rotate-images` (optional)
Set this equal to `"false"` if you do not want to switch out images when the board is `half` or `quarter`. The board does not switch out images when the board is full. The half / quarter is randomly selected on render, and does not change. Images will rotate every 3 seconds.


Example:
```html
<div class="stacksboard_widget" stacksboard-widget-contract="SP1F6E7S7SEZZ2R2VHCY0BYJ2G81CCSSJ7PC4SSHP.megapont-board-slot"
stacksboard-widget-rotate-images="false"
stacksboard-widget-board-size="quarter"></div>
```