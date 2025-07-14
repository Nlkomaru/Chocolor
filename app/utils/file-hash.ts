/**
 * ファイルから一意なハッシュIDを生成する
 * ファイル名、サイズ、最終更新日時を組み合わせてハッシュ化
 */
export async function generateFileHash(file: File): Promise<string> {
    // ファイルの基本情報を組み合わせた文字列を作成
    const fileInfo = `${file.name}-${file.size}-${file.lastModified}`;

    // TextEncoderでUint8Arrayに変換
    const encoder = new TextEncoder();
    const data = encoder.encode(fileInfo);

    // SHA-256ハッシュを生成
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);

    // ArrayBufferを16進数文字列に変換
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");

    // 短縮版として最初の16文字を返す
    return hashHex.substring(0, 16);
}

/**
 * ファイルの内容からより安全なハッシュIDを生成する（オプション）
 * ファイルサイズが大きい場合は最初の数KBのみを使用
 */
export async function generateContentHash(
    file: File,
    maxBytes = 8192,
): Promise<string> {
    // ファイルの最初の部分を読み取り
    const slice = file.slice(0, Math.min(maxBytes, file.size));
    const arrayBuffer = await slice.arrayBuffer();

    // SHA-256ハッシュを生成
    const hashBuffer = await crypto.subtle.digest("SHA-256", arrayBuffer);

    // ArrayBufferを16進数文字列に変換
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");

    // 短縮版として最初の16文字を返す
    return hashHex.substring(0, 16);
}
