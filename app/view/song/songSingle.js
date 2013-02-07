/**
 * Created with JetBrains PhpStorm.
 * Author: Kirill Cherkashin
 *
 */

// Sencha thows an error if strict mode is on.
//"use strict";

Ext.define( 'chords.view.song.songSingle', {
        extend: 'Ext.Container',
        xtype:  'songsingle',

        initialize: function () {
            this.callParent( arguments );

        },
        transpose:  function ( steps ) {
            this.fireEvent( "transposeSong", steps, this );
        },


        config: {
            scrollable: 'both',
            tpl:        [
                '<pre class = "info song chords">',
            /**
             * For phones we want to move the title out of the navigation bar.
             */
                Ext.os.deviceType == "Phone" ? '<h1>{performer} - {name}</h1>' : "",
                '{chords}',
                '<a href="http://{source}">{source}</a>',
                '</pre>'
            ]
        }
    }
);

