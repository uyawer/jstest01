// 座標
function Point(x, y) {
  this.x = x;
  this.y = y;
}

Point.prototype.with_offset = function (offset) {
  return new Point(this.x + offset.x, this.y + offset.y);
};

// グリッド(表)
function Grid(cells) {
  this.cells = cells;
}

// 指定した座標の値が"1"(有効)であるか判定
Grid.prototype.cell_at = function (point) {
  let cells = this.cells;
  if (point.y < 0 || cells.length <= point.y) return false;
  let line = cells[point.y];
  if (point.x < 0 || line.length <= point.x) return false;
  return line[point.x] === 1;
};
// 指定した座標の値を"1"(有効)にする
Grid.prototype.set_cell_enabled = function (point) {
  let cells = this.cells;
  return cells[point.y][point.x] = 1;
};
// 指定した座標の値を"0"(無効)にする
Grid.prototype.set_cell_disabled = function (point) {
  let cells = this.cells;
  return cells[point.y][point.x] = 0;
};
Grid.prototype.for_all_cells = function (cell_func) {
  for (let y = 0; y < this.cells.length; y++) {
    let line = this.cells[y];
    for (let x = 0; x < line.length; x++) {
      let position = new Point(x, y);
      cell_func(this, position);
    }
  }
};
Grid.prototype.copy = function () {
  let new_cells = [];
  for (let line of this.cells) {
    let new_line = [];
    for (let cell of line) {
      new_line.push(cell);
    }
    new_cells.push(new_line);
  }
  return new Grid(new_cells);
};

// 次のGridの状態を返却
function move_next(grid) {
  let next_grid = grid.copy();
  grid.for_all_cells(function (grid, position) {
    // "1"(有効)になっている周辺のセルをカウント
    let count = count_live_cells(position, grid);
    switch (count) {
      case 3:
        next_grid.set_cell_enabled(position);
        break;
      case 0:
      case 1:
      case 4:
      case 5:
      case 6:
      case 7:
      case 8:
        next_grid.set_cell_disabled(position);
        break;
      default:
        break;
    }
  });
  return next_grid;
}

// "1"(有効)になっている周辺のセルをカウント
function count_live_cells(center, grid) {
  let around_offset = [
    new Point(-1, -1), new Point(0, -1), new Point(1, -1),
    new Point(-1, 0), new Point(1, 0),
    new Point(-1, 1), new Point(0, 1), new Point(1, 1),
  ];
  let count = 0;
  for (let offset of around_offset) {
    if (grid.cell_at(center.with_offset(offset))) count += 1;
  }
  return count;
}