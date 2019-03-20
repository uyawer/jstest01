describe("カウント", function () {
  it("カウント(3x3)", function () {
    expect(count_live_cells(new Point(1, 1), new Grid([
      [1, 1, 0],
      [1, 0, 0],
      [0, 0, 0]
    ]))).toBe(3);
  });
  it("カウント(4x4)", function () {
    expect(count_live_cells(new Point(2, 2), new Grid([
      [0, 0, 0, 0],
      [0, 1, 1, 0],
      [0, 1, 0, 0],
      [0, 0, 0, 0]
    ]))).toBe(3);
  });
});

describe("グリッドをコピー", function () {
  it("グリッドをコピーする。", function () {
    let original = new Grid([
      [0, 0, 0, 0],
      [0, 1, 1, 0],
      [0, 1, 0, 0],
      [0, 0, 0, 0]
    ]);
    expect(original.copy()).toEqual(original);  // 値は同じ
    expect(original.copy()).not.toBe(original); // Objectは異なる
  })
});

describe("誕生", function () {
  it("誕生(3x3)", function () {
    expect(move_next(new Grid([
      [1, 1, 0],
      [1, 0, 0],
      [0, 0, 0]
    ]))).toEqual(new Grid([
      [1, 1, 0],
      [1, 1, 0],
      [0, 0, 0]
    ]));
  });

  it("誕生(4x4)", function () {
    expect(move_next(new Grid([
      [0, 0, 0, 0],
      [0, 1, 1, 0],
      [0, 1, 0, 0],
      [0, 0, 0, 0]
    ]))).toEqual(new Grid([
      [0, 0, 0, 0],
      [0, 1, 1, 0],
      [0, 1, 1, 0],
      [0, 0, 0, 0]
    ]));
  })
});

describe("生存", function () {
  it("生存(4x4)", function () {
    expect(move_next(new Grid([
      [0, 0, 0, 0],
      [0, 1, 1, 0],
      [0, 1, 1, 0],
      [0, 0, 0, 0]
    ]))).toEqual(new Grid([
      [0, 0, 0, 0],
      [0, 1, 1, 0],
      [0, 1, 1, 0],
      [0, 0, 0, 0]
    ]));
  });
});

describe("過疎", function () {
  it("過疎(3x3)", function () {
    expect(move_next(new Grid([
      [0, 0, 0],
      [0, 1, 1],
      [0, 0, 0]
    ]))).toEqual(new Grid([
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0]
    ]));
  });
  it("過疎(4x4)", function () {
    expect(move_next(new Grid([
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 1, 1],
      [0, 0, 0, 0]
    ]))).toEqual(new Grid([
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ]));
  });
});

describe("過密x誕生x生存", function () {
  it("過密x誕生x生存(3x3)", function () {
    expect(move_next(new Grid([
      [1, 1, 1],
      [1, 1, 0],
      [0, 0, 0]
    ]))).toEqual(new Grid([
      [1, 0, 1],
      [1, 0, 1],
      [0, 0, 0]
    ]));
  });
  it("過密x誕生x生存(4x4)", function () {
    expect(move_next(new Grid([
      [0, 0, 0, 0],
      [0, 1, 1, 1],
      [0, 1, 1, 0],
      [0, 0, 0, 0]
    ]))).toEqual(new Grid([
      [0, 0, 1, 0],
      [0, 1, 0, 1],
      [0, 1, 0, 1],
      [0, 0, 0, 0]
    ]));
  });
});