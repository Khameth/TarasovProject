$(document).ready(function () {
    const textBlock = $('#movableResizable');
    const handle = $('.text-handle');
    const contextMenu = $('<div class="context-menu"></div>');
    const moveOption = $('<div class="context-menu-option">Move</div>');
    const resizeOption = $('<div class="context-menu-option">Resize</div>');

    // Append options to the context menu
    contextMenu.append(moveOption);
    contextMenu.append(resizeOption);
    $('body').append(contextMenu);

    let isDragging = false;
    let isResizing = false;

    // Make the text block draggable
    textBlock.draggable({
        handle: '.text-handle'  // Set the handle for dragging
    });

    handle.mousedown(function (e) {
        isResizing = true;
        isDragging = false;
        e.preventDefault();
        setCursor('nwse-resize'); // Set cursor to resize
    });

    $(document).mousedown(function (e) {
        // Check if the click is outside the handle
        isDragging = !$(e.target).closest('.text-handle').length;

        // Hide context menu on any click
        contextMenu.hide();
    });

    textBlock.on('contextmenu', function (e) {
        // Show context menu on right-click
        e.preventDefault();
        contextMenu.css({
            top: e.pageY,
            left: e.pageX
        }).show();
    });

    moveOption.click(function () {
        // Set the text block to be draggable
        isResizing = false;
        textBlock.draggable('option', 'disabled', false);
        contextMenu.hide();
        setCursor('move'); // Set cursor to move
    });

    resizeOption.click(function () {
        // Set the text block to be resizable
        isResizing = true;
        textBlock.draggable('option', 'disabled', true);
        contextMenu.hide();
        setCursor('nwse-resize'); // Set cursor to resize
    });

    $(document).mousemove(function (e) {
        if (isResizing) {
            textBlock.css({
                width: e.pageX - textBlock.offset().left,
                height: e.pageY - textBlock.offset().top
            });
        } else if (isDragging) {
            textBlock.css({
                top: e.pageY - textBlock.height() / 2,
                left: e.pageX - textBlock.width() / 2
            });
        }
    });

    $(document).mouseup(function () {
        isResizing = false;
        isDragging = false;
    });

    function setCursor(cursorStyle) {
        textBlock.css('cursor', cursorStyle);
    }
});
