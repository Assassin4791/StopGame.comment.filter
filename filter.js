var ban, blackList, buttonStyleClassName, buttonTemplate, commentHiddenText, commentShownText, containerTemplate, eachFunc, hideElement, i, len, removeComments, showElement, styleTemplate, toggleComment;

blackList = ['user1', 'user2', 'user3'];

commentHiddenText = 'Показать скрытый комментарий';

commentShownText = 'Скрыть комментарий';

buttonStyleClassName = 'show-hide-comment-button';

buttonTemplate = "<button class='" + buttonStyleClassName + "' style='margin-top: 18px;'>" + commentHiddenText + "</button>";

containerTemplate = '<comment></comment>';

styleTemplate = "<style type='text/css'> ." + buttonStyleClassName + " { background: #34d96e; background-image: -webkit-linear-gradient(top, #34d96e, #2bb849); background-image: -moz-linear-gradient(top, #34d96e, #2bb849); background-image: -ms-linear-gradient(top, #34d96e, #2bb849); background-image: -o-linear-gradient(top, #34d96e, #2bb849); background-image: linear-gradient(to bottom, #34d96e, #2bb849); -webkit-border-radius: 8; -moz-border-radius: 8; border-radius: 8px; text-shadow: 1px 1px 3px #666666; -webkit-box-shadow: 4px 3px 3px #666666; -moz-box-shadow: 4px 3px 3px #666666; box-shadow: 4px 3px 3px #666666; font-family: Arial; color: #ffffff; font-size: 12px; padding: 2px; text-decoration: none; } ." + buttonStyleClassName + ":hover { background: #46fc3c; background-image: -webkit-linear-gradient(top, #46fc3c, #34d973); background-image: -moz-linear-gradient(top, #46fc3c, #34d973); background-image: -ms-linear-gradient(top, #46fc3c, #34d973); background-image: -o-linear-gradient(top, #46fc3c, #34d973); background-image: linear-gradient(to bottom, #46fc3c, #34d973); text-decoration: none; } </style>";

hideElement = function(element) {
  element.cssDisplayOld = element.css('display');
  element.css('display', 'none');
  element.hidden = true;
  return false;
};

showElement = function(element) {
  element.css('display', element.cssDisplayOld);
  element.hidden = false;
  return false;
};

toggleComment = function(comment, button) {
  var func, text;
  func = hideElement;
  text = commentHiddenText;
  if (comment.hidden) {
    func = showElement;
    text = commentShownText;
  }
  func(comment);
  button.text(text);
  return false;
};

eachFunc = function(index, elem) {
  var button, comment, element, htmlContent;
  element = $(elem).parent();
  htmlContent = element.html();
  element.html(buttonTemplate);
  button = element.find('button');
  element.append(containerTemplate);
  comment = element.find('comment');
  comment.append(htmlContent);
  hideElement(comment);
  button.on('click', function() {
    return toggleComment(comment, button);
  });
  return true;
};

removeComments = function(ban) {
  var elements;
  elements = $("div[id^='comment_id_']:has(a):contains('" + ban + "')");
  elements = elements.find('.sect-comment');
  elements.each(eachFunc);
  return false;
};

$('head').append(styleTemplate);

for (i = 0, len = blackList.length; i < len; i++) {
  ban = blackList[i];
  removeComments(ban);
}
