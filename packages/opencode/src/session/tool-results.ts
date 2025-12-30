import path from "path"
import fs from "fs/promises"
import { ulid } from "ulid"
import { Global } from "../global"

export namespace ToolResults {
  export async function save(sessionID: string, toolName: string, content: string): Promise<string> {
    const sanitizedToolName = toolName.replace(/[^a-zA-Z0-9_-]/g, "_")
    const filename = `${sanitizedToolName}-${ulid()}.txt`
    const dir = path.join(Global.Path.data, "storage", "tool_results", sessionID)
    await fs.mkdir(dir, { recursive: true })
    const filePath = path.join(dir, filename)
    await fs.writeFile(filePath, content, "utf-8")
    return filePath
  }
}
