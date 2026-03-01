import { ContentLayout } from "@/components/content/ContentLayout";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function SizeGuidePage() {
  return (
    <ContentLayout title="Size Guide" subtitle="Find your perfect fit.">
      <div className="space-y-12">
        {/* Fit Diagram */}
        <div className="bg-surface border border-white/5 rounded-2xl p-8 flex items-center justify-center aspect-[2/1]">
          <svg
            viewBox="0 0 400 300"
            className="w-full max-w-md text-muted-foreground"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            {/* T-shirt outline */}
            <path
              d="M120 60 L80 80 L60 140 L100 130 L100 260 L300 260 L300 130 L340 140 L320 80 L280 60 L240 80 C220 95 180 95 160 80 Z"
              strokeLinejoin="round"
            />
            {/* Chest measurement line */}
            <line
              x1="100"
              y1="140"
              x2="300"
              y2="140"
              strokeDasharray="6 3"
              opacity="0.5"
            />
            <text
              x="200"
              y="135"
              textAnchor="middle"
              fill="currentColor"
              fontSize="11"
              stroke="none"
              opacity="0.7"
            >
              Chest
            </text>
            {/* Length measurement line */}
            <line
              x1="320"
              y1="80"
              x2="320"
              y2="260"
              strokeDasharray="6 3"
              opacity="0.5"
            />
            <text
              x="345"
              y="170"
              textAnchor="middle"
              fill="currentColor"
              fontSize="11"
              stroke="none"
              opacity="0.7"
              transform="rotate(90 345 170)"
            >
              Length
            </text>
            {/* Shoulder measurement line */}
            <line
              x1="120"
              y1="60"
              x2="280"
              y2="60"
              strokeDasharray="6 3"
              opacity="0.5"
            />
            <text
              x="200"
              y="52"
              textAnchor="middle"
              fill="currentColor"
              fontSize="11"
              stroke="none"
              opacity="0.7"
            >
              Shoulder
            </text>
          </svg>
        </div>

        <div>
          <h3 className="font-heading text-2xl font-bold uppercase mb-6">
            Unisex Oversized Tees
          </h3>
          <div className="border border-white/5 rounded-lg overflow-hidden">
            <Table>
              <TableHeader className="bg-surface">
                <TableRow>
                  <TableHead className="w-[100px] text-white font-bold">
                    Size
                  </TableHead>
                  <TableHead className="text-white font-bold">
                    Chest (in)
                  </TableHead>
                  <TableHead className="text-white font-bold">
                    Length (in)
                  </TableHead>
                  <TableHead className="text-white font-bold">
                    Shoulder (in)
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-bold text-primary">XS</TableCell>
                  <TableCell>40</TableCell>
                  <TableCell>27</TableCell>
                  <TableCell>19</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-bold text-primary">S</TableCell>
                  <TableCell>42</TableCell>
                  <TableCell>28</TableCell>
                  <TableCell>20</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-bold text-primary">M</TableCell>
                  <TableCell>44</TableCell>
                  <TableCell>29</TableCell>
                  <TableCell>21</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-bold text-primary">L</TableCell>
                  <TableCell>46</TableCell>
                  <TableCell>30</TableCell>
                  <TableCell>22</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-bold text-primary">XL</TableCell>
                  <TableCell>48</TableCell>
                  <TableCell>31</TableCell>
                  <TableCell>23</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>

        <div className="bg-surface p-6 rounded-lg text-sm text-muted-foreground border-l-4 border-primary">
          <strong>Pro Tip:</strong> Our tees are designed to be slightly
          oversized. If you prefer a regular fit, consider sizing down.
        </div>
      </div>
    </ContentLayout>
  );
}
