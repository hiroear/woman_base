### アプリケーション概要
「WomanBase」
女性専用の交流掲示板です。
ログイン機能は付けずに、誰でも閲覧・トピック作成・トピックに対してのコメント投稿ができます。

### URL
[サイトURL]:https://woman-base-8626b4f5e035.herokuapp.com/
[WomanBase][サイトURL]
### 機能・使用技術　一覧
* インフラ
    * Heroku
* バックエンド
    * PostgreSQL
    * Ruby 3.1.3
    * Ruby on Rails 6.1.7.3
* フロントエンド
    * HTML
    * CSS
    * Javascript・JQuery
    * React 18.2.0
    * React-hook-form 7.45.1
    * React-toastify 8.0.0
    * Axios
    * material-UI 5.13.7
    * Bootstrap 5.2.3
* 機能一覧
    * トピック一覧・ページネーション・キーワード検索・ソート（Reactで実装）
    * 新着トピック一覧
    * 人気トピックランキング一覧（コメント数の多い順）
    * カテゴリ別トピック検索・キーワード検索
    * トピック投稿（React・react-hook-form・axios・material-UI）
    * トピックに対してのコメント投稿・ソート（React・axios・React-toastify）
    * トピックのお気に入り（javascript・Ajax・IPアドレスでユーザーを識別）
    * お気に入りトピック一覧・検索（React）

### 制作背景
プログラミングの勉強を始めた時から、一番に作りたかったものが女性の悩みに特化した交流掲示板でした。  
現時点では広い範囲での雑談形式になっていますので、女性特有の悩みに特化したカテゴリをさらに増やし  
お悩み相談・解決アプリにしたいと思っています。

### 苦労したところ
勉強中の Reactを導入したいと思い、Railsで完成していたビューに Reactを部分的に追加していく作業に、初めは慣れず試行錯誤しました。  
webpackerで Reactを導入し、gemを使わず関数と mount.jsを通してコンポーネントをビューに渡しています。  
初めての Railsへの React導入で至らない点も多々ありますが、Reactだとできることが増え、自由度も高く、javascriptの深い理解につながりました。  
今後は TypeScript、Next.jsにも挑戦したいと思っています。

### 今後改善・追加したい機能
* カテゴリの深いツリー構造の実装
* Railsを APIモードで作成しバックエンドとフロントエンド(React)を完全に分けて制作する
* Reactに TypeScript、Next.jsを導入