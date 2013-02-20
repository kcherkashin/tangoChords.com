/**
 * Created with JetBrains PhpStorm.
 * Author: Kirill Cherkashin
 *
 */

"use strict";
Ext.define( 'chords.controller.main', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            tabPanel: "#chordsTabPanel"
        },
        control: {
            tabPanel: {
                activeitemchange: 'updateUrl'
            }
        }
    },
    switchTab: function ( index, page ) {
        //var panel = this.getTabPanel();
        //if( panel.getActiveItem() !== page ) {
        //    panel.setActiveItem( index );
        // }

        // var tab = panel.query( "tab[title=" + page.getTab().title + "]" )[0];
        //tab.fireEvent( "tap", tab );
    },
    /**
     * Returns true is the url starts with the tab name. e.g.
     * url #Songs/songs will return true for "Songs", false for "Filter".
     *
     *
     */
    isActiveTab: function ( tabName ) {
        return location.hash.substr( 1 ).indexOf( tabName ) === 0;
    },


    updateUrl: function () {
        var newUrl = this.getTabPanel().getActiveItem().getTab().title;
        console.log( "U",newUrl );
        if( !this.isActiveTab( newUrl ) ) {
            this.redirectTo( newUrl );
        }
    },


    launch: function () {
        var routes = {};
        var index = 0;
        var tab;
        var panel = this.getTabPanel();

        /**
         * Iterate through all panel items.
         * For each of them add a route with a link in #Tab.title format, and add a handler to open the tab.
         */
        panel.items.each(
            function ( item ) {
                if( item.getTab ) {
                    tab = item.getTab();
                    /**
                     * We create a new function name, and set it to the route.
                     */
                    routes[ tab.title ] = "route" + tab.title;
                    /**
                     *  Now we create a function with the same name applying bind to the switch tab function
                     */
                    this[routes[ tab.title ]] = this.switchTab.bind( this, index, item );

                    if( this.isActiveTab( tab.title ) ) {
                        this.switchTab( index, item );
                    }
                    index++;

                }
            }.bind( this ) );

        this.setRoutes( routes );
    }



} );