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
                    /**
                     * This is a self executing function that prepares regexps we'll need further
                     */
                    regex: function () {

                        /**
                         *  Generic  Regexp to Match any chord
                         */
                        var chordBase = "[A-H][\\#b]?m?(5|6|7|9|sus2|sus4|7/9|dim)?";

                        return {
                            /**
                             *  This regex match line which has nothing but chords and spaces.
                             */
                            chordLine: new RegExp( "^\\s*(" + chordBase + "\\s*)+$" ),

                            /**
                             *  This regex is used to match and replace chords.
                             */
                            chord: new RegExp( "\\b(" + chordBase + ")\\s", "g" )

                        }

                    }(),

                    /**
                     * Wrap all chords in a span
                     * @param line
                     */
                    wrapChordsInLine: function ( line ) {
                        return (line + " ").replace( this.regex.chord, "<span class = 'chord'>$1</span> " );
                    },


                    /**
                     * Returns true is line consists of chords only.
                     *
                     * @param line
                     */
                    isChordLine: function ( line ) {
                        return line.match( this.regex.chordLine );
                    },

                    /**
                     * If a lines consists of chord only, we wrap the chords in it.
                     * @param line
                     */
                    wrapLine:   function ( line ) {
                        if( this.isChordLine( line ) ) {
                            line = this.wrapChordsInLine( line );
                            return '<p class = "chords-line">' + line + '</p>';
                        } else {
                            return '<p class = "text-line">' + line + '</p>';
                        }
                    },
                    /**
                     * Goes through the text and wraps chords in <p> elements
                     * e.g.
                     *
                     * Am   Dm
                     * alalalla
                     *
                     * Will turn into
                     * <p class = "chords-line">
                     *     <span class = 'chord'>Am</span>
                     *     <span class = 'chord'>Dm</span>
                     * </p>';
                     * <p class = "text-line">alalalla</p>
                     *
                     *
                     *
                     */
                    wrapChords: function ( text ) {
                        var lines = text.split( /[\n\r]/ );
                        for( var i = 0, l = lines.length; i < l; i++ ) {
                            lines[i] = this.wrapLine( lines[i] );
                        }
                        return  lines.join( "" );
                    }

                }
            )


        }
    }
);

