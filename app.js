/**
 * Created with JetBrains PhpStorm.
 * Author: Kirill Cherkashin
 *
 */

"use strict";

//<debug>
Ext.Loader.setPath( {
    'Ext.ux.touch.grid': 'app/components/touch.grid'
} );
//</debug>


var app = Ext.application( {

    name: 'chords',
    viewport: {
        autoMaximize: true
    },
    requires: [
        'Ext.MessageBox'
    ],

    models: ['song'],
    views: ['Main'],
    stores: ['songs'],
    controllers: ['songCard', 'songSingle', 'filterCard', 'main'],

    icon: {
        '57': 'resources/icons/Icon.png',
        '72': 'resources/icons/Icon~ipad.png',
        '114': 'resources/icons/Icon@2x.png',
        '144': 'resources/icons/Icon~ipad@2x.png'
    },

    isIconPrecomposed: true,


    launch: function () {
        // Destroy the #appLoadingIndicator element
        var appLoadingIndicator = Ext.fly( 'appLoadingIndicator' );
        if( appLoadingIndicator ) {
            appLoadingIndicator.destroy();
        }

        // Initialize the main view
        Ext.Viewport.add( Ext.create( 'chords.view.Main' ) );

    },

    onUpdated: function () {
        Ext.Msg.confirm(
            "Application Update",
            "This application has just successfully been updated to the latest version. Reload now?",
            function ( buttonId ) {
                if( buttonId === 'yes' ) {
                    window.location.reload();
                }
            }
        );
    }
} );

