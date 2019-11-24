* 自定义一个可创建多实例的对话框弹窗
* 可设置参数: title(标题, 默认为空), content(内容, 默认为空), confirmText(确定按钮文字，默认-"确定"), cancelText(取消按钮文字，默认-"取消")
* 可绑定和解绑事件: open, close, confirm。调用实例的 "on" 方法绑定，例如 dialog.on('open', function() {})，调用实例的 "off" 方法解绑, 例如 dialog.off('open', handler)，并且可绑定多个事件，不互相影响，触发顺序按照绑定的先后顺序
* 点击确定按钮触发 confirm 事件并打印 "确定"
* 点击取消按钮触发 close 事件，关闭弹框并打印 "取消"
* 样式随意，尽量美观