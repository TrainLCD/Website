import { describe, it, expect } from "vitest";
import { GET as getRss } from "../rss.xml";
import { GET as getAtom } from "../atom.xml";

const readBody = async (response: Response) => response.text();

describe("RSS feed", () => {
  it("includes service status items and sets CORS headers", async () => {
    const response = await getRss();
    const body = await readBody(response);

    expect(response.headers.get("Access-Control-Allow-Origin")).toBe("*");
    expect(response.headers.get("Access-Control-Allow-Methods")).toBe(
      "GET, HEAD"
    );
    expect(body).toContain("<category>service-status</category>");
    expect(body).toContain('guid isPermaLink="false">service:');
    expect(body).toContain("<category>incident</category>");
  });
});

describe("Atom feed", () => {
  it("includes service entries alongside incidents and sets CORS headers", async () => {
    const response = await getAtom();
    const body = await readBody(response);

    expect(response.headers.get("Access-Control-Allow-Origin")).toBe("*");
    expect(response.headers.get("Access-Control-Allow-Methods")).toBe(
      "GET, HEAD"
    );
    expect(body).toContain('category term="service-status"');
    expect(body).toContain('category term="incident"');
    expect(body).toContain("#service-");
  });
});
