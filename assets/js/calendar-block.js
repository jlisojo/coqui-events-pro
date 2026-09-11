(function (blocks, element, blockEditor, components, serverSideRender, i18n) {
    var __ = i18n.__;
    var el = element.createElement;
    var InspectorControls = blockEditor.InspectorControls;
    var PanelBody = components.PanelBody;
    var TextControl = components.TextControl;
    var ToggleControl = components.ToggleControl;
    var ServerSideRender = serverSideRender;

    blocks.registerBlockType('coqui-events-pro/event-calendar', {
        title: __('Event Calendar', 'coqui-events-pro'),
        description: __('Display a navigable monthly event calendar.', 'coqui-events-pro'),
        icon: 'calendar-alt',
        category: 'widgets',
        keywords: [
            __('events', 'coqui-events-pro'),
            __('calendar', 'coqui-events-pro'),
            __('recurring', 'coqui-events-pro')
        ],
        attributes: {
            month: {
                type: 'string',
                default: ''
            },
            show_filters: {
                type: 'boolean',
                default: true
            }
        },
        edit: function (props) {
            var attributes = props.attributes;
            var setAttributes = props.setAttributes;

            return [
                el(InspectorControls, { key: 'inspector' },
                    el(PanelBody, {
                        title: __('Calendar Settings', 'coqui-events-pro'),
                        initialOpen: true
                    },
                    el(TextControl, {
                        label: __('Initial Month', 'coqui-events-pro'),
                        help: __('Optional date in YYYY-MM-DD format. Leave blank for the current month.', 'coqui-events-pro'),
                        value: attributes.month,
                        placeholder: '2026-09-01',
                        onChange: function (value) {
                            setAttributes({ month: value });
                        }
                    }),
                    el(ToggleControl, {
                        label: __('Show Category Filter', 'coqui-events-pro'),
                        checked: attributes.show_filters,
                        onChange: function (value) {
                            setAttributes({ show_filters: value });
                        }
                    }))
                ),
                el('div', { key: 'preview', className: 'coqui-events-pro-calendar-block-preview' },
                    el(ServerSideRender, {
                        block: 'coqui-events-pro/event-calendar',
                        attributes: attributes
                    })
                )
            ];
        },
        save: function () {
            return null;
        }
    });
})(
    window.wp.blocks,
    window.wp.element,
    window.wp.blockEditor || window.wp.editor,
    window.wp.components,
    window.wp.serverSideRender || window.wp.components.ServerSideRender,
    window.wp.i18n
);
