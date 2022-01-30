import { ColumnSettingData } from './treegrid.interface';

function createShowItem(id, text, hidden) {
  return `<li class="e-menu-item e-blankicon ${
    hidden && 'e-menu-hide'
  }" id="${id}" role="menuitem" data-value="null" tabindex="-1"
    style="padding-left: 42px;">${text}</li>\n`;
}

function createShowItemWithCss(id, text, checked, hidden) {
  return `<li class="e-menu-item ${
    hidden && 'e-menu-hide'
  }" id="${id}" role="menuitem" data-value="null" tabindex="-1"><span
    class="e-menu-icon e-check-icon ${
      checked ? 'checked' : 'unchecked'
    }"></span>${text}</li>\n`;
}

export function updateContextMenuHtml(
  isHeader,
  menuItems,
  multiSelectChecked,
  filterChecked,
  multiSortChecked,
  frozenChecked,
  columnsSettings: Array<ColumnSettingData>,
  selectedColumnField
) {
  let result = '';
  const matchedColumn = columnsSettings.find(
    (column) => column.field === selectedColumnField
  );
  menuItems.forEach((item) => {
    let hiddenItem = false;
    if (isHeader && item.target === '.e-content') hiddenItem = true;
    else if (!isHeader && item.target === '.e-headercontent') hiddenItem = true;

    if (item.iconCss) {
      let checked = false;
      if (item.id === 'multiSelect') checked = multiSelectChecked;
      else if (item.id === 'filterCol') checked = filterChecked;
      else if (item.id === 'multiSort') checked = multiSortChecked;
      else if (item.id === 'freezeCol') checked = frozenChecked;
      // else if (item.id === 'freezeCol')
      //   checked = matchedColumn?.frozen || false;

      result =
        result + createShowItemWithCss(item.id, item.text, checked, hiddenItem);
    } else {
      result = result + createShowItem(item.id, item.text, hiddenItem);
    }
  });
  return result;
}
