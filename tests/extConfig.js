/**
 * Created with JetBrains PhpStorm.
 * Author: Kirill Cherkashin
 *
 */

"use strict";
/**
 * We have to delay the test until app is loaded
 */
window.__testacular__.loaded = function () {
};

/**
 * We need base before the path for testacular
 */






Ext.Loader.setPath( {
    'Ext': 'touch/src',
    'chords': 'base/app',
    'Ext.ux.touch.grid': 'base/app/components/touch.grid'

} );
/**
 * Ugly!
 * TODO: Find how to call app.launch
 */
Ext.onReady( function () {
    window.setTimeout( function () {
        window.__testacular__.start();
    }, 500 )

} );
;


