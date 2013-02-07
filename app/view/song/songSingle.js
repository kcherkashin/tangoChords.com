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
            this.config.tpl.parent = this;

        },
        transpose:  function ( steps ) {
            this.fireEvent( "transposeSong", steps, this );
        },


        config: {
            scrollable: 'both',
            tpl:        new Ext.XTemplate(
                '<pre class = "info song chords">',
                Ext.os.deviceType == "Phone" ? '<h1>{title}</h1>' : '',
                '{[this.wrapChords(values.text)]}',
                '<a href="http://{source}">{source}</a>',
                '</pre>',
                {
                    wrapChords: function ( text ) {
                        var chords = "";

                        /**
                         *  Generic  Regexp to Match any chord
                         */
                        var chordBase = "[A-H][\\#b]?m?(5|6|7|9|sus2|sus4|7/9|dim)?";

                        /**
                         *  This regex match line which has nothing but chords and spaces.
                         */
                        var chordsOnlyRegex = new RegExp( "^\\s*(" + chordBase + "\\s*)+$" );

                        /**
                         *  This regex is used to match and replace chords.
                         */
                        var chordsRegexp = new RegExp( "\\b(" + chordBase + ")\\s", "g" );


                        var lines = text.split( /[\n\r]/ );

                        /**
                         * We only want to work with lines that have nothing but the chords.
                         */
                        for( var i = 0, l = lines.length; i < l; i++ ) {
                            if( lines[i].match( chordsOnlyRegex ) ) {
                                lines[i] = (lines[i] + " ").replace( chordsRegexp, "<span class = 'chord'>$1</span> " );
                                chords += '<p class = "chords-line">' + lines[i] + '</p>';
                            } else {
                                chords += '<p class = "text-line">' + lines[i] + '</p>';
                            }
                        }

                        return  chords;


                    }

                }
            )


        }
    }
);

