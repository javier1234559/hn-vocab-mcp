/**
 * hn-vocab — chỉ đọc tab "vocab" có sẵn
 *
 * Script property: SYNC_TOKEN = hn-vocab-demo-a7f3c91e2b4d
 * Sau khi sửa: Deploy → Manage deployments → Edit → New version
 *
 * action=load (mặc định): trả về mọi dòng (header hàng 1 → key JSON)
 */

var VOCAB_SHEET = "vocab";

function doGet(e) {
  return handle_(e && e.parameter ? e.parameter : {});
}

function doPost(e) {
  var body = {};
  try {
    if (e && e.postData && e.postData.contents) {
      body = JSON.parse(e.postData.contents);
    }
  } catch (err) {
    return json_({ ok: false, error: "JSON body không hợp lệ" });
  }
  var params = Object.assign({}, (e && e.parameter) || {}, body);
  return handle_(params);
}

function handle_(params) {
  try {
    assertToken_(params.token);
    var action = String(params.action || "load");
    if (action !== "load") {
      return json_({ ok: false, error: "Chỉ hỗ trợ action=load" });
    }
    return json_({
      ok: true,
      action: "load",
      vocab: loadVocab_(),
      spreadsheetUrl: SpreadsheetApp.getActiveSpreadsheet().getUrl(),
    });
  } catch (err) {
    return json_({ ok: false, error: String(err.message || err) });
  }
}

function assertToken_(token) {
  var expected = PropertiesService.getScriptProperties().getProperty("SYNC_TOKEN");
  if (!expected) throw new Error("Chưa set Script property SYNC_TOKEN");
  if (!token || token !== expected) throw new Error("Token không hợp lệ");
}

function getVocabSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName(VOCAB_SHEET);
  if (!sh) throw new Error('Không tìm thấy tab "' + VOCAB_SHEET + '"');
  return sh;
}

/** Hàng 1 = header; mọi hàng sau → object theo tên cột. Bỏ hàng trống. */
function loadVocab_() {
  var sh = getVocabSheet_();
  var values = sh.getDataRange().getValues();
  if (!values.length) return [];

  var headers = values[0].map(function (h) {
    return String(h || "").trim();
  });
  var out = [];

  for (var r = 1; r < values.length; r++) {
    var row = values[r];
    var empty = true;
    var obj = {};
    for (var c = 0; c < headers.length; c++) {
      var key = headers[c] || "col" + (c + 1);
      var val = row[c];
      if (val !== "" && val !== null && val !== undefined) empty = false;
      if (Object.prototype.toString.call(val) === "[object Date]") {
        val = Utilities.formatDate(val, Session.getScriptTimeZone(), "yyyy-MM-dd");
      }
      obj[key] = val;
    }
    if (!empty) out.push(obj);
  }
  return out;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}
