## 注意点
- wslのnodeとdocker環境のnodeのバージョンを事前に合わせる
- vscodeの環境はwslでアプリの実行環境はコンテナ上で行う
- vscodeのエラーをなくすためローカル環境も構築するがnode_moduleをWSLとコンテナで同期しない
  - 理由1. パフォーマンスの低下やディスク領域の消費
  - 理由2. ホストマシン（WSL）とDockerコンテナが異なるOSやアーキテクチャを使用している場合、ビルド済みのネイティブモジュール（C++などで書かれたモジュール）が動作しない可能性があり
- そのためnpm installはコンテナ内とWSL内の2か所で行う（up時に勝手にやるようにしている）

## 使用コマンド
```sh
# 起動 ビルド バックグラウンド
docker-compose up --build -d
docker-compose up -d

# サービスを停止
docker-compose stop

# 停止しているサービスを再開
docker-compose start

# 再起動
docker-compose restart: 

# 仮想環境に接続
docker exec -it {container_id} /bin/bash

# コンテナの稼働状況一覧
docker ps -a
docker-compose ps

# アプリケーションを停止、関連コンテナを削除
docker-compose down
docker-compose down -v # volume削除（データベースも永久に削除される）
```

