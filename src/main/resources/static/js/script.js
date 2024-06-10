const fontSizeArr = ['8px','9px','10px','12px','14px','16px','20px','24px','32px','42px','54px','68px','84px','98px','120px'];

var Size = Quill.import('attributors/style/size');
Size.whitelist = fontSizeArr;
Quill.register(Size, true);
Quill.register({
  'modules/better-table': quillBetterTable
}, true)


$('#saveBtn').on('click', function() {
    html2canvas(document.getElementById('canvas-container'), {
                    onrendered: function(canvas) {
                        // Convert the canvas to a data URL
                        var dataURL = canvas.toDataURL('image/png');

                        // Create a link element
                        var link = document.createElement('a');
                        link.href = dataURL;
                        link.download = 'webpage-screenshot.png';

                        // Append the link to the body
                        document.body.appendChild(link);

                        // Programmatically click the link to trigger the download
                        link.click();

                        // Remove the link from the document
                        document.body.removeChild(link);
                    }
                });
    });

var counter = 1;

$("#tableBtn").draggable({
    opacity: 0.7,
    helper: "clone",
    stop: function(event, ui) {
        var editorId = "editor" + counter;
        var textAreaId = "textArea" + counter;
        counter++;

        var editor = $("<div class=\"h-auto textContainer\"></div>")
                    .attr("id", editorId);
        var textArea = $("<div class=\"ui-widget-content h-auto\" style=\"position: absolute;\"></div>")
                    .attr("id",textAreaId);
        textArea.append(editor)

        editorId = "#" + editorId;
        textAreaId = "#" + textAreaId;

        textArea.css({
            position: 'absolute',
            top: ui.offset.top,
            left: ui.offset.left,
            'min-width': "50px"
        });
        editor.css({
                    width: "100%",
                    height: "100%"
                });

        $('#canvas-container').append(textArea);


        const quill = new Quill(editorId, {
         modules: {
            formula: true,
            toolbar: [
                    [{ 'size': fontSizeArr }],
                    ['bold', 'italic', 'underline'],
                    ['formula'],
                ],
            table: false,
            'better-table': {
            operationMenu: {
                items: {
                      deleteTable: false
                },
                      color: {
                         colors: ['green', 'red', 'yellow', 'blue', 'white'],
                         text: 'Background Colors:'
                       }
                     }
            }
            },
            theme: 'snow'
        });

        const enableMathQuillFormulaAuthoring = window.mathquill4quill();
        enableMathQuillFormulaAuthoring(quill, {
            operators: [["\\pm", "\\pm"], ["\\sqrt{x}", "\\sqrt"], ["\\frac{x}{y}", "\\frac"], ["\\int^{s}_{x}{d}", "\\int"], ["\\neq", "\\neq"]]
        });

        let tableModule = quill.getModule('better-table')
        tableModule.insertTable(3, 3)

        $(textAreaId).children('[role="toolbar"]').prepend('<button class="close-button position-absolute top-0 end-0" style="padding-top: 6px;"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16"><path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/></svg></button>');
        $(textAreaId).on('click', '.close-button', function() {
            $(textAreaId).remove();
        });

        $( function() {
            $( textAreaId ).draggable({ containment: "#canvas-container", scroll: false });
            $(textAreaId).draggable( "disable" );
          } );
            $(textAreaId).children('[role="toolbar"]').on('dblclick', function() {
                quill.blur();
                $(textAreaId).draggable( "enable" );
                $(textAreaId).children('[role="toolbar"]').css({
                    display: "none"
                });
            });
            $(editorId).on('dblclick', function() {
                if (quill.hasFocus() && quill.getSelection().length == 0){
                     quill.blur();
                     $(textAreaId).draggable( "enable" );
                     $(textAreaId).children('[role="toolbar"]').css({
                        display: "none"
                     });
                } else {
                     quill.focus();
                     $(textAreaId).draggable( "disable" );
                     $(textAreaId).children('[role="toolbar"]').css({
                        display: "block"
                     });
                }
            });
    }});

$("#imageBtn").draggable({
    opacity: 0.7,
    helper: "clone",
    stop: function(event, ui) {
        var editorId = "editor" + counter;
        var textAreaId = "textArea" + counter;
        counter++;

        var editor = $("<div class=\"h-auto textContainer\"></div>")
                    .attr("id", editorId);
        var textArea = $("<div class=\"ui-widget-content h-auto\" style=\"position: absolute;\"></div>")
                    .attr("id", textAreaId);
        textArea.append(editor)

        editorId = "#" + editorId;
        textAreaId = "#" + textAreaId;

        textArea.css({
            position: 'absolute',
            top: ui.offset.top,
            left: ui.offset.left,
            width: 150,
            height: 150
        });
        editor.css({
                    width: "100%",
                    height: "100%"
                });

        $('#canvas-container').append(textArea);


        const quill = new Quill(editorId, {
         modules: {
            toolbar: [['image']]},
            theme: 'snow'
        });

        $(textAreaId).children('[role="toolbar"]').children('.ql-formats').children('.ql-image').trigger("click");
        $(textAreaId).children('[role="toolbar"]').css({ display: "none", height: '24px' });
        $(editorId).children('.ql-editor').attr('style', 'padding-top: 0px;padding-bottom: 0px;padding-right: 0px; padding-left: 0px;');
        quill.blur();
        quill.on('text-change', () => {
          quill.enable(false);
        });

        $( function() {
            $( textAreaId ).draggable({ containment: "#canvas-container", scroll: false });
            quill.blur();
          } );
        $( function() {
            $( textAreaId ).resizable({});
            quill.blur();
          } );
        $(textAreaId).on('dblclick', function() {
            $(textAreaId).remove();
          });
    }
});

$("#textBtn").draggable({
    opacity: 0.7,
    helper: "clone",
    stop: function(event, ui) {
        var editorId = "editor" + counter;
        var textAreaId = "textArea" + counter;
        counter++;

        var editor = $("<div class=\"h-auto textContainer\"></div>")
                    .attr("id", editorId);
        var textArea = $("<div class=\"ui-widget-content h-auto\" style=\"position: absolute;\"></div>")
                    .attr("id",textAreaId);
        textArea.append(editor)

        editorId = "#" + editorId;
        textAreaId = "#" + textAreaId;

        textArea.css({
            position: 'absolute',
            top: ui.offset.top,
            left: ui.offset.left,
            'min-width': "50px"
        });
        editor.css({
                    width: "100%",
                    height: "100%"
                });

        $('#canvas-container').append(textArea);


        const quill = new Quill(editorId, {
         modules: {
            formula: true,
            toolbar: [
                    [{ 'size': fontSizeArr }],
                    ['bold', 'italic', 'underline'],
                    ['formula'],
                ],
            },
            theme: 'snow'
        });

        const enableMathQuillFormulaAuthoring = window.mathquill4quill();
        enableMathQuillFormulaAuthoring(quill, {
            operators: [["\\pm", "\\pm"], ["\\sqrt{x}", "\\sqrt"], ["\\frac{x}{y}", "\\frac"], ["\\int^{s}_{x}{d}", "\\int"], ["\\neq", "\\neq"]]
        });


        $(textAreaId).children('[role="toolbar"]').prepend('<button class="close-button position-absolute top-0 end-0" style="padding-top: 6px;"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16"><path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/></svg></button>');
        $(textAreaId).on('click', '.close-button', function() {
            $(textAreaId).remove();
        });

        $( function() {
            $( textAreaId ).draggable({ containment: "#canvas-container", scroll: false });
            $(textAreaId).draggable( "disable" );
          } );
            $(textAreaId).children('[role="toolbar"]').on('dblclick', function() {
                quill.blur();
                $(textAreaId).draggable( "enable" );
                $(textAreaId).children('[role="toolbar"]').css({
                    display: "none"
                });
            });
            $(editorId).on('dblclick', function() {
                if (quill.hasFocus() && quill.getSelection().length == 0){
                     quill.blur();
                     $(textAreaId).draggable( "enable" );
                     $(textAreaId).children('[role="toolbar"]').css({
                        display: "none"
                     });
                } else {
                     quill.focus();
                     $(textAreaId).draggable( "disable" );
                     $(textAreaId).children('[role="toolbar"]').css({
                        display: "block"
                     });
                }
            });
    }
});

function updateDeltaView (quill) {
  document.body.querySelector('#delta-view')
    .innerHTML = JSON.stringify(
      quill.getContents()
    )
}

$('#arrowBtn').on('click', function() {
    var element1ID = null;
    var element2ID = null;

    $('.textContainer').on('click', function() {
        if (element1ID === null) {
            // Store the ID of element 1
            element1ID = $(this).attr('id');
            console.log("Clicked on element after pressing the button. ID: " + element1ID);
        } else {
            // Store the ID of element 2
            element2ID = $(this).attr('id');
            console.log("Clicked on element 2 after pressing the button. ID: " + element2ID);
            $('.textContainer').off('click');
            var line = new LeaderLine(
                document.getElementById(element1ID),
                document.getElementById(element2ID)
            );
            line.color = 'black';
            document.getElementById(element1ID).addEventListener('mousemove', AnimEvent.add(function() {
              line.position();
            }), false);
            document.getElementById(element2ID).addEventListener('mousemove', AnimEvent.add(function() {
              line.position();
            }), false);
        }
    });
});

document.getElementById('arrowBtn').addEventListener('dblclick', function() {
    var leaderLines = document.querySelectorAll('.leader-line');
    leaderLines.forEach(function(element) {
        element.remove();
    });
});



      let opts = {
        brushColor: "#000000",
        brushSize: parseInt(size.value),
      };

      // Initializing Drawing Tablet
      const dt = new DrawingTablet("#canvas-container", {
        logs: true,
        brushSize: opts.brushSize,
        bg: "white",
        color: opts.brushColor,
        autosave: true,
        width: 850,
        height: 600,
      });

      dt.log("Drawing Tablet Initialized");

      const dcs = document.querySelectorAll(".dt-default-colors");
      const dcp = document.querySelectorAll(".dt-cp-container");

      dcs.forEach((e) => {
        e.children[0].style.background = e.dataset.color;
        selectColor();
        e.addEventListener("click", () => {
          dt.brushColor = e.dataset.color;
          opts.brushColor = e.dataset.color;
          selectColor();
        });
      });
      function selectColor() {
        dcs.forEach((el) => {
          el.style.border = `2px solid  ${
            opts.brushColor === el.dataset.color
              ? el.dataset.color
              : "transparent"
          }`;
        });
      }
      dtPicker.addEventListener("input", (e) => {
        dt.brushColor = e.target.value;
        selectColor();
      });
//      download.addEventListener("click", () => {
//        dt.download();
//      });
      undo.addEventListener("click", () => {
        dt.undo();
      });
      redo.addEventListener("click", () => {
        dt.redo();
      });
      clear.addEventListener("click", () => {
        const b = confirm("Are you sure to clear?");
        if (b) {
          dt.clear();
        }
      });

      size.addEventListener("input", (e) => {
        dt.brushSize = parseInt(e.target.value);
      });

      pencil.addEventListener("click", () => {
        if (dt.brushType === type.pencil) {
            dt.empty();
        } else  {
            dt.pencil();
            dt.brushSize = parseInt(size.value);
            dt.brushColor = opts.brushColor;
        }
        isSelected();
      });

      highlighter.addEventListener("click", () => {
        if (dt.brushType === type.highlighter) {
            dt.empty();
        } else  {
            dt.highlighter();
            dt.brushColor = opts.brushColor;
        }
        isSelected();
      });

      eraser.addEventListener("click", () => {
        if (dt.brushType === type.eraser) {
            dt.empty();
        } else  {
            dt.eraser();
        }
        isSelected();
      });

      function isSelected() {
        if (dt.brushType === type.pencil) {
          document.querySelector("#pencil").style.bottom = "-10px";
          document.querySelector("#highlighter").style.bottom = "-25px";
          document.querySelector("#eraser").style.bottom = "-25px";
        } else if (dt.brushType === type.eraser) {
          document.querySelector("#pencil").style.bottom = "-25px";
          document.querySelector("#highlighter").style.bottom = "-25px";
          document.querySelector("#eraser").style.bottom = "-10px";
        } else if (dt.brushType === type.highlighter) {
          document.querySelector("#highlighter").style.bottom = "-10px";
          document.querySelector("#pencil").style.bottom = "-25px";
          document.querySelector("#eraser").style.bottom = "-25px";
        } else if (dt.brushType === type.empty){
          document.querySelector("#pencil").style.bottom = "-25px";
          document.querySelector("#highlighter").style.bottom = "-25px";
          document.querySelector("#eraser").style.bottom = "-25px";
        }
      }
      isSelected();
