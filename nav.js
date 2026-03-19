const pages = [
    { href: 'index.html', id: 'tokens', label: 'Design Tokens' },
    { href: 'typography.html', id: 'typography', label: 'Typography' },
    { href: 'icons.html', id: 'icons', label: 'Icons' },
    { href: 'forms.html', id: 'forms', label: 'Forms', children: [
        { href: 'forms.html#buttons', label: 'Buttons' },
        { href: 'forms.html#inputs', label: 'Inputs' },
        { href: 'forms.html#selects', label: 'Selects' },
        { href: 'forms.html#checkboxes', label: 'Checkboxes & Toggles' },
        { href: 'forms.html#custom-select', label: 'Custom Select' },
    ]},
    { href: 'badges.html', id: 'badges', label: 'Badges' },
    { href: 'list-cards.html', id: 'list-cards', label: 'List Cards', children: [
        { href: 'list-cards.html#list-row', label: 'List Row' },
        { href: 'list-cards.html#kebab-menu', label: 'Kebab Menu' },
    ]},
    { href: 'layout.html', id: 'layout', label: 'Layout', children: [
        { href: 'layout.html#layout-desktop', label: 'Desktop' },
        { href: 'layout.html#layout-widescreen', label: 'Widescreen' },
        { href: 'layout.html#layout-mobile', label: 'Mobile' },
        { href: 'layout.html#content-layouts', label: 'Content Layouts' },
    ]},
    { href: 'patterns.html', id: 'patterns', label: 'Patterns', children: [
        { href: 'patterns.html#tabs', label: 'Tabs' },
        { href: 'patterns.html#sidebar', label: 'Sidebar' },
        { href: 'patterns.html#item-list', label: 'Item List' },
        { href: 'patterns.html#page-header', label: 'Page Header' },
        { href: 'patterns.html#image-gallery', label: 'Image Gallery' },
        { href: 'patterns.html#description-list', label: 'Description List' },
        { href: 'patterns.html#content-section', label: 'Content Section' },
    ]},
];

const chevron = `<svg class="sidebar__chevron" width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

function renderNav(activeId) {
    const currentFile = location.pathname.split('/').pop() || 'index.html';

    let html = '';
    for (const page of pages) {
        if (page.separator) {
            html += `<div class="sidebar__separator"></div>\n`;
            continue;
        }

        const isActive = page.id === activeId || page.href === currentFile;
        const hasChildren = page.children && page.children.length > 0;

        if (hasChildren) {
            const groupId = 'nav-' + page.id;
            html += `<button class="sidebar__link sidebar__toggle${isActive ? ' sidebar__link--active' : ''}" data-target="${groupId}" onclick="toggleNav(this)">${page.label}${chevron}</button>\n`;
            html += `<div class="sidebar__group${isActive ? ' sidebar__group--open' : ''}" id="${groupId}">\n`;
            html += `<a href="${page.href}" class="sidebar__link sidebar__link--sub">Overview</a>\n`;
            for (const child of page.children) {
                html += `<a href="${child.href}" class="sidebar__link sidebar__link--sub">${child.label}</a>\n`;
            }
            html += `</div>\n`;
        } else {
            html += `<a href="${page.href}" class="sidebar__link${isActive ? ' sidebar__link--active' : ''}">${page.label}</a>\n`;
        }
    }

    document.getElementById('nav').innerHTML = html;
}

function toggleNav(btn) {
    const target = document.getElementById(btn.dataset.target);
    const isOpen = target.classList.contains('sidebar__group--open');
    if (isOpen) {
        target.classList.remove('sidebar__group--open');
        btn.classList.remove('sidebar__toggle--open');
    } else {
        target.classList.add('sidebar__group--open');
        btn.classList.add('sidebar__toggle--open');
    }
}
