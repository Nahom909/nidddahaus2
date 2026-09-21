/* Registriert eine echte, originalgetreue Live-Vorschau fürs CMS (statt
   reinem Text-Dump), für beide Speisekarten-Dateien. Läuft nur im /admin. */
(function () {
  function renderItem(it, i, mi, name, desc, price) {
    return h(
      'div', { className: mi, key: i },
      h(
        'div', {},
        h(
          'div', { className: name },
          it.nummer ? h('em', {}, it.nummer) : null,
          it.name
        ),
        it.description ? h('div', { className: desc }, it.description) : null
      ),
      h('div', { className: price }, it.price)
    );
  }

  // theme: 'beige' (reguläre Speisekarte) oder 'navy' (Wochenkarte)
  function makeSectionRenderer(theme) {
    var isNavy = theme === 'navy';
    var catCls = isNavy ? 'wcat' : 'cat';
    var boxCls = isNavy ? 'wbox' : 'box';
    var hintCls = isNavy ? 'whint' : 'hint';
    var miCls = isNavy ? 'wmi' : 'mi';
    var nameCls = isNavy ? 'wmi-name' : 'mi-name';
    var descCls = isNavy ? 'wmi-desc' : 'mi-desc';
    var priceCls = isNavy ? 'wmi-price' : 'mi-price';

    return function renderSection(sec, i) {
      if (sec.type === 'empfehlung') {
        return h(
          'div', { className: boxCls, key: i, style: { gridColumn: '1 / -1' } },
          sec.title ? h('h3', {}, sec.title) : null,
          h('div', { className: 'd' }, sec.highlight_name || '(Name fehlt)'),
          sec.highlight_desc ? h('div', { className: 'dd' }, sec.highlight_desc) : null,
          h('div', { className: 'pr' }, sec.highlight_price || '')
        );
      }
      if (sec.type === 'hinweistext') {
        return h(
          'div', { className: boxCls, key: i, style: { gridColumn: '1 / -1' } },
          sec.title ? h('h3', {}, sec.title) : null,
          h('p', {}, sec.text || '(Text fehlt)')
        );
      }
      // Kategorie
      var cls = catCls + (sec.wide ? ' wide' : '') + (!isNavy && sec.accent ? ' steaks' : '');
      return h(
        'div', { className: cls, key: i },
        h('h3', {}, sec.title || '(Titel fehlt)'),
        sec.text ? h('p', { className: 'intro' }, sec.text) : null,
        sec.hint_text
          ? h(
              'div', { className: hintCls },
              h(
                'div', {},
                sec.hint_title ? h('b', {}, sec.hint_title) : null,
                h('p', {}, sec.hint_text)
              )
            )
          : null,
        h(
          'div', { className: 'items' },
          (sec.items || []).map(function (it, j) {
            return renderItem(it, j, miCls, nameCls, descCls, priceCls);
          })
        )
      );
    };
  }

  function makePreview(theme) {
    var renderSection = makeSectionRenderer(theme);
    return createClass({
      render: function () {
        var data = this.props.entry.get('data');
        data = data && data.toJS ? data.toJS() : {};
        var sections = data.sections || [];
        var footnotes = data.footnotes || [];

        var grid = h(
          'div', { className: theme === 'navy' ? 'wk-grid' : 'menu-grid' },
          sections.map(renderSection)
        );

        var foot = footnotes.length
          ? h(
              'div', { className: 'menu-foot' },
              footnotes.map(function (n, i) {
                return h(
                  'div', { className: 'note', key: i },
                  n.title ? h('b', {}, n.title) : null,
                  n.text
                );
              })
            )
          : null;

        if (theme === 'navy') {
          return h('div', { className: 'wk-wrap' },
            h('span', { className: 'preview-kicker' }, 'Wöchentlich wechselnd'),
            grid
          );
        }
        return h('div', {}, grid, foot);
      },
    });
  }

  CMS.registerPreviewStyle('preview.css');
  CMS.registerPreviewTemplate('speisekarte', makePreview('beige'));
  CMS.registerPreviewTemplate('wochenkarte', makePreview('navy'));
})();
